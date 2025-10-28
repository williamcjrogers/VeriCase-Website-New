from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Optional, List
import jwt
import uuid
import os
from emergentintegrations.llm.chat import LlmChat, UserMessage

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client["vericase"]
users_collection = db["users"]
content_collection = db["content"]
chat_collection = db["chats"]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY")

# Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ContentUpdate(BaseModel):
    section: str
    field: str
    content: str

class AIMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class AIImprove(BaseModel):
    text: str

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = users_collection.find_one({"_id": user_id})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@app.get("/api/")
def root():
    return {"message": "VeriCase API"}

@app.post("/api/auth/register")
def register(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    users_collection.insert_one({
        "_id": user_id,
        "email": user.email,
        "hashed_password": hash_password(user.password),
        "full_name": user.full_name,
        "is_admin": True,
        "created_at": datetime.now(timezone.utc)
    })
    
    token = create_token({"sub": user_id})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/api/auth/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    users_collection.update_one(
        {"_id": db_user["_id"]},
        {"$set": {"last_login": datetime.now(timezone.utc)}}
    )
    
    token = create_token({"sub": db_user["_id"]})
    return {"access_token": token, "token_type": "bearer", "user": {"email": db_user["email"], "full_name": db_user["full_name"]}}

@app.get("/api/auth/me")
def get_me(current_user=Depends(get_current_user)):
    return {"email": current_user["email"], "full_name": current_user["full_name"]}

@app.get("/api/content")
def get_content():
    content = list(content_collection.find())
    return [{"_id": str(c["_id"]), **{k: v for k, v in c.items() if k != "_id"}} for c in content]

@app.put("/api/content/{content_id}")
def update_content(content_id: str, update: ContentUpdate, current_user=Depends(get_current_user)):
    content_collection.update_one(
        {"_id": content_id},
        {"$set": {
            "content": update.content,
            "updated_by": current_user["_id"],
            "updated_at": datetime.now(timezone.utc)
        }},
        upsert=True
    )
    return {"message": "Content updated"}

@app.post("/api/ai/chat")
async def ai_chat(msg: AIMessage, current_user=Depends(get_current_user)):
    session_id = msg.session_id or str(uuid.uuid4())
    
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message="You are a content writing assistant for VeriCase, a legal-tech platform. Help improve marketing copy, suggest better headlines, and generate compelling content focused on business outcomes for construction dispute professionals. Keep responses concise and actionable."
    ).with_model("openai", "gpt-4o")
    
    response = await chat.send_message(UserMessage(text=msg.message))
    
    # Save to history
    chat_collection.update_one(
        {"session_id": session_id, "user_id": current_user["_id"]},
        {"$push": {
            "messages": [
                {"role": "user", "content": msg.message, "timestamp": datetime.now(timezone.utc)},
                {"role": "assistant", "content": response, "timestamp": datetime.now(timezone.utc)}
            ]
        }},
        upsert=True
    )
    
    return {"response": response, "session_id": session_id}

@app.post("/api/ai/improve")
async def ai_improve(data: AIImprove, current_user=Depends(get_current_user)):
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=str(uuid.uuid4()),
        system_message="You are a content writing assistant. Improve the given text to be more compelling, clear, and professional. Return ONLY the improved text, no explanations."
    ).with_model("openai", "gpt-4o")
    
    response = await chat.send_message(UserMessage(text=f"Improve this text: {data.text}"))
    return {"improved": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)