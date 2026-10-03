"""Build a static Superdesign review export from the existing production build.

This transforms HTML and embeds unmodified files. It does not edit source, build
output or image pixels. Run with `uv run --no-project python <this file>`.
"""

import base64
import hashlib
import json
import mimetypes
import re
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BUILD = ROOT / "frontend/build"
OUT = Path(__file__).resolve().parent
VOID = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}
asset_manifest = {}


class Element:
    def __init__(self, tag, attrs=None):
        self.tag, self.attrs, self.children = tag, dict(attrs or []), []


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.root = Element("document")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        item = Element(tag, attrs)
        self.stack[-1].children.append(item)
        if tag not in VOID:
            self.stack.append(item)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)

    def handle_entityref(self, name):
        self.stack[-1].children.append("&" + name + ";")

    def handle_charref(self, name):
        self.stack[-1].children.append("&#" + name + ";")

    def handle_comment(self, data):
        pass


def embed(url):
    if url.startswith(("data:", "https://")):
        return url
    path = (BUILD / url.split("?")[0].lstrip("/")).resolve()
    assert path.is_relative_to(BUILD.resolve()) and path.is_file(), url
    data = path.read_bytes()
    mime = {"woff2": "font/woff2", "svg": "image/svg+xml"}.get(
        path.suffix[1:]
    ) or mimetypes.guess_type(path)[0]
    assert mime
    asset_manifest[str(path.relative_to(BUILD))] = {
        "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
        "mime": mime,
    }
    return f"data:{mime};base64," + base64.b64encode(data).decode()


def css_inline(css):
    return re.sub(
        r"url\(\s*([\'\"]?)([^)\'\"]+)\1\s*\)",
        lambda m: 'url("' + embed(m.group(2)) + '")',
        css,
    )


def text_content(node):
    return "".join(
        text_content(child) if isinstance(child, Element) else child
        for child in node.children
    )


anchor_count = 0
buttons = 0
native_disclosures = 0


def transform(node):
    global anchor_count, buttons, native_disclosures
    if not isinstance(node, Element):
        return node
    if node.tag in ("script", "noscript"):
        return None
    if node.tag == "link":
        rel = node.attrs.get("rel")
        if rel == "stylesheet":
            path = BUILD / node.attrs["href"].lstrip("/")
            node = Element(
                "style", [("data-review-source", str(path.relative_to(BUILD)))]
            )
            node.children = [css_inline(path.read_text())]
            return node
        if rel in ("preload", "manifest", "icon", "apple-touch-icon"):
            return None
    if node.tag == "style":
        node.children = [css_inline(text_content(node))]
        return node
    if node.tag == "html":
        node.attrs["class"] = "fonts-ready"
    if node.tag == "body":
        node.attrs.pop("class", None)
    if node.tag == "img":
        node.attrs["src"] = embed(node.attrs["src"])
        node.attrs.pop("srcset", None)
        node.attrs["loading"] = "eager"
    if node.tag == "a":
        anchor_count += 1
        label = node.attrs.get("aria-label") or text_content(node) or "site-link"
        slug = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")[:65]
        node.attrs["id"] = f"review-{slug}-{anchor_count}"
        href = node.attrs.get("href", "#top")
        if href.startswith("mailto:"):
            node.attrs["href"] = "#demonstration"
            node.attrs["title"] = (
                "Static review: email enquiry address is shown in the demonstration section."
            )
        elif href.startswith("tel:"):
            node.attrs["href"] = "#about"
            node.attrs["title"] = (
                "Static review: the contact telephone number is shown in the profile."
            )
        elif href == "/":
            node.attrs["href"] = "#top"
        elif href.startswith("/"):
            node.attrs["href"] = "https://veri-case.com" + href
        assert node.attrs.get("href", "").startswith(("https://", "#")), node.attrs
    if node.tag == "button":
        buttons += 1
        node.attrs["disabled"] = None
        node.attrs["aria-disabled"] = "true"
        node.attrs["title"] = (
            "Unavailable in this static design review. Verify this control in the implemented website."
        )
    if node.tag == "details":
        native_disclosures += 1
    node.attrs = {
        key: value for key, value in node.attrs.items() if not key.startswith("on")
    }
    node.children = [
        updated for child in node.children if (updated := transform(child)) is not None
    ]
    return node


def render(node):
    if isinstance(node, str):
        return node
    if node.tag == "document":
        return "".join(render(child) for child in node.children)
    attrs = "".join(
        " "
        + key
        + (('="' + escape(value, quote=True) + '"') if value is not None else "")
        for key, value in node.attrs.items()
    )
    start = "<" + node.tag + attrs + ">"
    if node.tag in VOID:
        return start
    return (
        start
        + "".join(render(child) for child in node.children)
        + "</"
        + node.tag
        + ">"
    )


source = (BUILD / "index.html").read_bytes()
parser = Parser()
parser.feed(source.decode())
document = transform(parser.root)
html_node = next(
    node
    for node in document.children
    if isinstance(node, Element) and node.tag == "html"
)
head = next(
    node
    for node in html_node.children
    if isinstance(node, Element) and node.tag == "head"
)
body = next(
    node
    for node in html_node.children
    if isinstance(node, Element) and node.tag == "body"
)
assert len([x for x in body.children if isinstance(x, Element)]) == 1
assert next(x for x in body.children if isinstance(x, Element)).tag == "div"
# The full compiled Tailwind CSS is embedded. The import service may inject its
# standard Tailwind CDN script; the export itself does not need that script.
style = Element("style")
style.children = [
    "html{scroll-behavior:smooth}button[disabled]{cursor:default}footer .max-md\\:data-\\[state\\=closed\\]\\:hidden{display:block}footer button[aria-expanded]{display:none}footer h2.hidden{display:block}"
]
head.children.append(style)
meta = Element(
    "meta",
    [
        ("name", "description"),
        (
            "content",
            "Static review export of the implemented VeriCase website, 03 October 2026. Native profile and FAQ disclosures work; JavaScript controls are disabled. No analytics or application runtime is included.",
        ),
    ],
)
head.children.append(meta)
output = "<!DOCTYPE html>\n" + render(document)
assert "/Users/" not in output and "file://" not in output
assert "posthog" not in output
(OUT / "implementation-2026-10-03.html").write_text(output)
manifest = {
    "createdAt": datetime.now(timezone.utc).isoformat(),
    "sourceBuild": "frontend/build/index.html",
    "sourceBuildSha256": hashlib.sha256(source).hexdigest(),
    "exportSha256": hashlib.sha256(output.encode()).hexdigest(),
    "exportBytes": len(output.encode()),
    "embeddedAssets": asset_manifest,
    "anchorsWithUniqueIds": anchor_count,
    "disabledButtons": buttons,
    "nativeDisclosures": native_disclosures,
    "boundaries": [
        "Static visual review of the implemented website, not a second design proposal.",
        "Images, portraits, fonts and logos are embedded unchanged from the existing public build.",
        "The application JavaScript, analytics, JSON-LD and asset-preload links were removed.",
        "Enquiry mail links point to the contact section in the canvas; the email address stays visible.",
        "Native profile and FAQ disclosures remain functional. Other buttons are disabled.",
        "Historical screenshot crops remain defined by the production CSS.",
        "The mobile footer is expanded so static navigation content remains available.",
    ],
}
(OUT / "implementation-2026-10-03.manifest.json").write_text(
    json.dumps(manifest, indent=2) + "\n"
)
print(
    json.dumps(
        {key: value for key, value in manifest.items() if key != "embeddedAssets"},
        indent=2,
    )
)
print("Embedded assets:", ", ".join(asset_manifest))
