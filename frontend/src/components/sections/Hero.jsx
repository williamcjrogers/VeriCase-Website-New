import { useRef, useState, useEffect } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Sparkles, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const EditableText = ({ children, section, field, className, as: Component = 'div' }) => {
  const { isEditMode } = useEditMode();
  const [content, setContent] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setContent(children);
  }, [children]);

  const handleBlur = async () => {
    const newContent = contentRef.current.innerText;
    if (newContent !== content) {
      setContent(newContent);
      try {
        await axios.put(`${API_URL}/api/content/${section}-${field}`, {
          section,
          field,
          content: newContent
        });
        toast.success('Saved!');
      } catch (error) {
        toast.error('Failed to save');
      }
    }
  };

  const handleAIImprove = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/improve`, {
        text: contentRef.current.innerText
      });
      contentRef.current.innerText = data.improved;
      setContent(data.improved);
      toast.success('AI improved your text!');
      handleBlur();
    } catch (error) {
      toast.error('AI improve failed');
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Component
        ref={contentRef}
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={`${className} ${isEditMode ? 'outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 rounded px-2 -mx-2' : ''}`}
      >
        {content}
      </Component>
      
      {isEditMode && isHovered && (
        <div className="absolute -top-10 left-0 flex gap-2 bg-white shadow-lg rounded-lg p-2 border border-gray-200 z-10">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleAIImprove}
            className="text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI Improve
          </Button>
        </div>
      )}
    </div>
  );
};

const EditableImage = ({ src, alt, className, section, field }) => {
  const { isEditMode } = useEditMode();
  const [imageSrc, setImageSrc] = useState(src);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        toast.success('Image updated! (Note: Save to persist)');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageSrc} alt={alt} className={className} />
      
      {isEditMode && isHovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Replace Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

const DeletableSection = ({ children, sectionId }) => {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Delete this section?')) {
      toast.success('Section deleted! (Refresh to undo)');
      // Hide the section
      document.getElementById(sectionId).style.display = 'none';
    }
  };

  return (
    <div 
      id={sectionId}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {isEditMode && isHovered && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-20 p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const Hero = () => {
  return (
    <DeletableSection sectionId="hero-section">
      <section 
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%)'
        }}
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 md:space-y-10" data-testid="hero-text">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
                <Zap className="w-4 h-4 text-orange-500" />
                <EditableText section="hero" field="tagline" className="text-sm font-semibold text-gray-700" as="span">
                  Records, Records... VeriCase
                </EditableText>
              </div>
              
              <EditableText 
                section="hero" 
                field="headline" 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-gray-900"
                as="h1"
              >
                Make Time Your <span className="text-gradient-teal">Ally</span>, Not Your Enemy.
              </EditableText>
              
              <EditableText 
                section="hero" 
                field="subheadline" 
                className="text-xl md:text-2xl font-semibold text-teal-600"
                as="p"
              >
                From Chaos to Clarity in Construction Disputes
              </EditableText>
              
              <EditableText 
                section="hero" 
                field="description" 
                className="text-lg leading-relaxed text-gray-600 max-w-2xl"
                as="p"
              >
                Extract mass data instantly. Build true chronologies nobody else can. Respond to rebuttals 
                with auto-selected evidence. Uncover years of contemporaneous records—all in one intelligent platform.
              </EditableText>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl px-10 py-7 text-lg group"
                  style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
                >
                  See VeriCase in Action
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-semibold border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all duration-200 px-10 py-7 text-lg"
                >
                  How It Works
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Instant Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral-500 rounded-full"></div>
                  <span>UK-Based Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>

            <div className="relative" data-testid="hero-visual">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <EditableImage 
                  src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/vly647vf_ChronologyLens1jpg.jpg"
                  alt="VeriCase Chronology Lens"
                  className="w-full h-auto"
                  section="hero"
                  field="main-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <EditableText section="hero" field="stat1-value" className="text-4xl font-bold text-teal-600 mb-1" as="div">
                  80%
                </EditableText>
                <EditableText section="hero" field="stat1-label" className="text-sm text-gray-600" as="div">
                  Faster evidence review
                </EditableText>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <EditableText section="hero" field="stat2-value" className="text-4xl font-bold text-coral-500 mb-1" as="div">
                  £M
                </EditableText>
                <EditableText section="hero" field="stat2-label" className="text-sm text-gray-600" as="div">
                  Saved in disputes
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DeletableSection>
  );
};