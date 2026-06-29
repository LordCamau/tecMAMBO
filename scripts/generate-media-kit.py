from __future__ import annotations

import shutil
from datetime import date
from pathlib import Path

from PIL import Image, ImageChops
from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, DictionaryObject, NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
YEAR = 2026
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "apps" / "web" / "public" / "media"
PDF_NAME = f"tecMAMBO-Media-Kit-{YEAR}.pdf"
PUBLIC_PDF = PUBLIC_DIR / PDF_NAME
OUTPUT_PDF = OUTPUT_DIR / PDF_NAME
LOGO_SOURCE = ROOT / "apps" / "web" / "public" / "brand" / "tecMAMBO-bp.svg.png"
LOGO_PRINT = PUBLIC_DIR / "tecMAMBO-logo-print.png"
LOGO_PRINT_WHITE = PUBLIC_DIR / "tecMAMBO-logo-print-white.png"

PURPLE = colors.HexColor("#6A00FF")
PURPLE_DARK = colors.HexColor("#4A0099")
ORANGE = colors.HexColor("#FF8A00")
INK = colors.HexColor("#1A1A1F")
MUTED = colors.HexColor("#56565F")
LIGHT = colors.HexColor("#F4F2FA")
LINE = colors.HexColor("#E2DCF4")
WHITE = colors.white

PAGE_W, PAGE_H = A4
MARGIN_X = 24 * mm
TOP = PAGE_H - 24 * mm
BOTTOM = 22 * mm


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        (
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        )
    ]
    for display, text, bold in candidates:
        if Path(display).exists() and Path(text).exists() and Path(bold).exists():
            try:
                pdfmetrics.registerFont(TTFont("TMDisplay", display))
                pdfmetrics.registerFont(TTFont("TMText", text))
                pdfmetrics.registerFont(TTFont("TMBold", bold))
                return "TMDisplay", "TMText", "TMBold"
            except Exception:
                continue
    return "Helvetica-Bold", "Helvetica", "Helvetica-Bold"


DISPLAY, TEXT, BOLD = register_fonts()

styles = {
    "eyebrow": ParagraphStyle(
        "eyebrow",
        fontName="Courier",
        fontSize=8.5,
        leading=11,
        textColor=PURPLE_DARK,
        alignment=TA_LEFT,
        spaceAfter=6,
    ),
    "title": ParagraphStyle(
        "title",
        fontName=DISPLAY,
        fontSize=34,
        leading=37,
        textColor=INK,
        alignment=TA_LEFT,
    ),
    "cover_title": ParagraphStyle(
        "cover_title",
        fontName=DISPLAY,
        fontSize=48,
        leading=50,
        textColor=INK,
        alignment=TA_LEFT,
    ),
    "body": ParagraphStyle(
        "body",
        fontName=TEXT,
        fontSize=11,
        leading=16,
        textColor=MUTED,
        alignment=TA_LEFT,
    ),
    "body_big": ParagraphStyle(
        "body_big",
        fontName=TEXT,
        fontSize=13,
        leading=19,
        textColor=MUTED,
        alignment=TA_LEFT,
    ),
    "card_title": ParagraphStyle(
        "card_title",
        fontName=DISPLAY,
        fontSize=15,
        leading=18,
        textColor=INK,
        alignment=TA_LEFT,
    ),
    "small": ParagraphStyle(
        "small",
        fontName=TEXT,
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
        alignment=TA_LEFT,
    ),
    "center": ParagraphStyle(
        "center",
        fontName=TEXT,
        fontSize=12,
        leading=16,
        textColor=MUTED,
        alignment=TA_CENTER,
    ),
}


def clean_logo() -> None:
    if LOGO_PRINT.exists() and LOGO_PRINT_WHITE.exists():
        return
    if not LOGO_PRINT.exists() and not LOGO_SOURCE.exists():
        raise FileNotFoundError(
            "Create apps/web/public/brand/tecMAMBO-bp.svg.png from the official SVG before running this script."
        )
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    if not LOGO_PRINT.exists():
        im = Image.open(LOGO_SOURCE).convert("RGBA")
        rgb = im.convert("RGB")
        diff = ImageChops.difference(rgb, Image.new("RGB", rgb.size, (255, 255, 255))).convert("L")
        bbox = diff.point(lambda p: 255 if p > 8 else 0).getbbox()
        if not bbox:
            raise RuntimeError("Could not locate logo pixels.")
        pad = 36
        left, top, right, bottom = bbox
        crop = im.crop((max(0, left - pad), max(0, top - pad), min(im.width, right + pad), min(im.height, bottom + pad)))
        alpha = ImageChops.difference(crop.convert("RGB"), Image.new("RGB", crop.size, (255, 255, 255))).convert("L").point(
            lambda p: 0 if p < 8 else 255
        )
        crop.putalpha(alpha)
        crop.save(LOGO_PRINT)
    if not LOGO_PRINT_WHITE.exists():
        base = Image.open(LOGO_PRINT).convert("RGBA")
        white = Image.new("RGBA", base.size, (255, 255, 255, 0))
        white.putalpha(base.getchannel("A"))
        white.save(LOGO_PRINT_WHITE)


def paragraph(c: Canvas, text: str, style: ParagraphStyle, x: float, y: float, width: float) -> float:
    p = Paragraph(text, style)
    _, h = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y - h)
    return y - h


def draw_logo(c: Canvas, x: float, y: float, width: float, logo_path: Path = LOGO_PRINT) -> float:
    im = Image.open(logo_path)
    ratio = im.height / im.width
    height = width * ratio
    c.drawImage(str(logo_path), x, y - height, width=width, height=height, mask="auto")
    return y - height


def header_footer(c: Canvas, page_no: int) -> None:
    draw_logo(c, MARGIN_X, PAGE_H - 8 * mm, 30 * mm)
    c.setFont(TEXT, 7.5)
    c.setFillColor(MUTED)
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 12 * mm, f"Media Kit {YEAR}")
    c.setStrokeColor(LINE)
    c.line(MARGIN_X, PAGE_H - 21 * mm, PAGE_W - MARGIN_X, PAGE_H - 21 * mm)
    c.setFont(TEXT, 8)
    c.drawString(MARGIN_X, 11 * mm, "tecMAMBO · Made to be understood.")
    c.drawRightString(PAGE_W - MARGIN_X, 11 * mm, str(page_no))


def page_title(c: Canvas, page_no: int, title: str, eyebrow: str = "MEDIA KIT") -> float:
    c.showPage()
    header_footer(c, page_no)
    y = PAGE_H - 35 * mm
    y = paragraph(c, eyebrow, styles["eyebrow"], MARGIN_X, y, PAGE_W - 2 * MARGIN_X)
    y -= 2 * mm
    y = paragraph(c, title, styles["title"], MARGIN_X, y, PAGE_W - 2 * MARGIN_X)
    return y - 9 * mm


def rounded_rect(c: Canvas, x: float, y: float, w: float, h: float, fill=WHITE, stroke=LINE) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.roundRect(x, y, w, h, 6, stroke=1, fill=1)


def card(c: Canvas, x: float, y: float, w: float, title: str, body: str, h: float = 42 * mm) -> None:
    rounded_rect(c, x, y - h, w, h)
    paragraph(c, title, styles["card_title"], x + 5 * mm, y - 6 * mm, w - 10 * mm)
    paragraph(c, body, styles["body"], x + 5 * mm, y - 18 * mm, w - 10 * mm)


def bullets_page(c: Canvas, page_no: int, title: str, items: list[tuple[str, str]], note: str | None = None) -> None:
    y = page_title(c, page_no, title)
    col_w = (PAGE_W - 2 * MARGIN_X - 10 * mm) / 2
    for i, (item_title, body) in enumerate(items):
        x = MARGIN_X + (col_w + 10 * mm) * (i % 2)
        row = i // 2
        card(c, x, y - row * 52 * mm, col_w, item_title, body, 45 * mm)
    if note:
        paragraph(c, note, styles["body_big"], MARGIN_X, 42 * mm, PAGE_W - 2 * MARGIN_X)


def table_page(c: Canvas, page_no: int, title: str, intro: str, rows: list[tuple[str, str]]) -> None:
    y = page_title(c, page_no, title)
    y = paragraph(c, intro, styles["body_big"], MARGIN_X, y, PAGE_W - 2 * MARGIN_X) - 12 * mm
    row_h = 15 * mm
    table_w = PAGE_W - 2 * MARGIN_X
    left_w = table_w * 0.43
    c.setFont(TEXT, 10)
    for idx, (label, value) in enumerate(rows):
        y0 = y - idx * row_h
        fill = LIGHT if idx % 2 == 0 else WHITE
        rounded_rect(c, MARGIN_X, y0 - row_h + 2, table_w, row_h, fill=fill)
        c.setFillColor(INK)
        c.setFont(BOLD, 10)
        c.drawString(MARGIN_X + 5 * mm, y0 - 9 * mm, label)
        c.setFont(TEXT, 10)
        c.setFillColor(MUTED)
        c.drawString(MARGIN_X + left_w, y0 - 9 * mm, value)


def generate() -> Path:
    clean_logo()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    c = Canvas(str(OUTPUT_PDF), pagesize=A4, pageCompression=1)
    c.setTitle(f"tecMAMBO Media Kit {YEAR}")
    c.setAuthor("tecMAMBO")
    c.setSubject("Advertising and partnerships")

    # Cover
    c.setFillColor(LIGHT)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.rect(0, PAGE_H - 34 * mm, PAGE_W, 34 * mm, fill=1, stroke=0)
    draw_logo(c, MARGIN_X, PAGE_H - 60 * mm, 84 * mm)
    paragraph(c, f"Media Kit {YEAR}", styles["cover_title"], MARGIN_X, PAGE_H - 128 * mm, PAGE_W - 2 * MARGIN_X)
    paragraph(c, "Made to be understood.", styles["body_big"], MARGIN_X, PAGE_H - 150 * mm, PAGE_W - 2 * MARGIN_X)
    paragraph(
        c,
        "Partner with the tech publication built on clarity.",
        styles["body_big"],
        MARGIN_X,
        PAGE_H - 164 * mm,
        PAGE_W - 2 * MARGIN_X,
    )
    c.setFillColor(ORANGE)
    c.roundRect(MARGIN_X, 44 * mm, 78 * mm, 15 * mm, 5, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont(DISPLAY, 10)
    c.drawCentredString(MARGIN_X + 39 * mm, 49 * mm, "tecMAMBO.com/advertise")

    # 2 Hello
    y = page_title(c, 2, "Hello. We are tecMAMBO.", "HELLO")
    paragraph(
        c,
        "tecMAMBO is a technology publication with one promise: make technology understandable without dumbing it down. Founded in 2016 in Nairobi, we are the translation layer between confusing tech and the people who use it, from first-time buyers to seasoned enthusiasts. We explain, review, and demystify technology in plain English, so our readers can understand it and decide what is worth their money. That clarity is our craft. It is also what makes us a trusted, valuable place for your brand.",
        styles["body_big"],
        MARGIN_X,
        y,
        PAGE_W - 2 * MARGIN_X,
    )

    # 3 Why partner
    bullets_page(
        c,
        3,
        "Why partner with tecMAMBO",
        [
            ("An audience that is deciding.", "Our readers are researching phones, tools, and services and working out what to buy. That is a high-intent moment, and a valuable one."),
            ("Trust that transfers.", "We are independent, we label everything sponsored, and we never let advertising bend our verdicts. A message here lands differently from a banner on a clickbait page."),
            ("We make complex things clear.", "If your product is powerful but hard to explain, you are who we can help most. Making complicated technology make sense is the single thing we do best."),
            ("Rooted in Kenya, read beyond it.", "We understand this market, and we speak to a growing pan-African and global audience of tech-curious readers."),
        ],
    )

    # 4 Audience
    y = page_title(c, 4, "Our audience", "AUDIENCE")
    y = paragraph(
        c,
        "We are a young, fast-growing publication, and we believe in showing real numbers, not inflated ones. Here is who you reach.",
        styles["body_big"],
        MARGIN_X,
        y,
        PAGE_W - 2 * MARGIN_X,
    )
    y -= 14 * mm
    rounded_rect(c, MARGIN_X, y - 54 * mm, PAGE_W - 2 * MARGIN_X, 54 * mm, fill=WHITE)
    paragraph(
        c,
        "Audience figures are shared from current verified data when they are ready. We do not publish placeholder metrics, inflated reach figures, or invented engagement claims.",
        styles["body_big"],
        MARGIN_X + 8 * mm,
        y - 9 * mm,
        PAGE_W - 2 * MARGIN_X - 16 * mm,
    )
    paragraph(c, "Figures current when shared. Ask us for the latest breakdown.", styles["small"], MARGIN_X, 46 * mm, PAGE_W - 2 * MARGIN_X)

    # 5 What we publish
    bullets_page(
        c,
        5,
        "What we publish",
        [
            ("MAMBO Explains", "Jargon-busting guides that make the moving parts make sense."),
            ("Reviews", "The verdict first, the full spec sheet a tap away."),
            ("Wallet Watch", "Honest budget picks and buying decisions with the hype taken out."),
            ("MAMBO vs Real Life", "How technology behaves once it leaves the keynote."),
            ("Should You Care?", "The news, translated into what it changes for you."),
            ("MAMBO Take", "Clear, accountable opinion."),
            ("The Glossary", "A plain-English dictionary wired into every article."),
        ],
        "We cover AI, smartphones, computing, apps, audio, wearables, connectivity, power, and more.",
    )

    # 6 Ways to partner
    bullets_page(
        c,
        6,
        "Ways to partner",
        [
            ("Display advertising.", "Clean, viewable placements that respect the reader. No clutter, no pop-ups. Ideal for awareness and reach."),
            ("Sponsored and partner content.", "Plain-English branded stories, written to our standard and clearly labelled. Ideal when your product needs explaining, not just showing."),
            ("Newsletter sponsorship.", "A clear message in The MAMBO Briefing, in front of readers who opted in. Ideal for engaged, direct reach."),
            ("Commerce and Wallet Watch.", "Honest, disclosed product inclusion in our buying guides and deals. Merit based. Ideal for products that earn their place."),
            ("Custom partnerships.", "Sponsored explainer series, Glossary sponsorships, events, and video, built around your goals."),
        ],
        "One thing we do not sell: our independent reviews and verdicts. That is what keeps our audience trusting us.",
    )

    # 7 Specifications
    table_page(
        c,
        7,
        "Specifications",
        "Final specifications are confirmed on booking, with formats selected to respect the reader and the page experience.",
        [
            ("Display units", "Leaderboard, medium rectangle, half page, billboard, and mobile units to confirm on booking."),
            ("Accepted formats", "JPG, PNG, HTML5, and approved third-party tags, subject to creative review."),
            ("Max file size", "Confirmed on booking."),
            ("Newsletter", "Image, headline, body copy, and link limits confirmed on booking."),
            ("Sponsored content", "Word-count range, assets, labelling, and turnaround confirmed on booking."),
        ],
    )

    # 8 Rate guide
    table_page(
        c,
        8,
        "Rate guide",
        "We tailor to your goals rather than a rigid rate card. These are starting points to plan with. Share your budget and we will propose options.",
        [
            ("Display", "Available on request"),
            ("Newsletter sponsorship", "Available on request"),
            ("Sponsored article", "Available on request"),
            ("Custom partnership", "Available on request"),
            ("Packages", "Built around scope, placement, and duration"),
        ],
    )
    paragraph(c, "Indicative only. Final pricing depends on scope, placement, and duration.", styles["small"], MARGIN_X, 44 * mm, PAGE_W - 2 * MARGIN_X)

    # 9 Honest by design
    y = page_title(c, 9, "Honest by design", "STANDARDS")
    paragraph(
        c,
        "Everything sponsored is clearly labelled, and our editorial team keeps the final say on quality. That transparency is not a limitation, it is the reason our audience trusts what they read, and why your message benefits from being in that environment. Read our editorial standards at tecMAMBO.com/editorial-standards.",
        styles["body_big"],
        MARGIN_X,
        y,
        PAGE_W - 2 * MARGIN_X,
    )

    # 10 How it works
    y = page_title(c, 10, "How it works", "PROCESS")
    steps = [
        ("Tell us your goals.", "Share what you want to achieve, and your rough budget."),
        ("We propose a plan.", "Formats and ideas suited to your goals, not a generic rate card."),
        ("We create and launch.", "For content, crafted to tecMAMBO quality, with your input and clear labelling."),
        ("We report back.", "Clear results, so you know what your spend did."),
    ]
    for idx, (title, body) in enumerate(steps):
        y0 = y - idx * 33 * mm
        c.setFillColor(PURPLE)
        c.circle(MARGIN_X + 6 * mm, y0 - 7 * mm, 5 * mm, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont("Courier", 8)
        c.drawCentredString(MARGIN_X + 6 * mm, y0 - 9.5 * mm, str(idx + 1))
        paragraph(c, title, styles["card_title"], MARGIN_X + 18 * mm, y0, PAGE_W - 2 * MARGIN_X - 18 * mm)
        paragraph(c, body, styles["body"], MARGIN_X + 18 * mm, y0 - 10 * mm, PAGE_W - 2 * MARGIN_X - 18 * mm)

    # 11 Talk
    y = page_title(c, 11, "Let us make your brand understood.", "NEXT STEP")
    paragraph(c, "Tell us about your goals and we will be in touch.", styles["body_big"], MARGIN_X, y, PAGE_W - 2 * MARGIN_X)
    c.setFillColor(ORANGE)
    c.roundRect(MARGIN_X, y - 36 * mm, 92 * mm, 15 * mm, 5, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont(DISPLAY, 10)
    c.drawCentredString(MARGIN_X + 46 * mm, y - 31 * mm, "tecMAMBO.com/advertise")

    # Back cover
    c.showPage()
    c.setFillColor(PURPLE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, (PAGE_W - 94 * mm) / 2, PAGE_H / 2 + 12 * mm, 94 * mm, LOGO_PRINT_WHITE)
    white_style = styles["center"].clone("white_center")
    white_style.textColor = WHITE
    white_style.fontName = DISPLAY
    paragraph(c, "Made to be understood.", white_style, MARGIN_X, PAGE_H / 2 - 22 * mm, PAGE_W - 2 * MARGIN_X)

    c.save()

    writer = PdfWriter()
    reader = PdfReader(str(OUTPUT_PDF))
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata(
        {
            "/Title": f"tecMAMBO Media Kit {YEAR}",
            "/Author": "tecMAMBO",
            "/Subject": "Advertising and partnerships",
            "/Creator": "tecMAMBO media-kit generator",
        }
    )
    writer._root_object.update(
        {
            NameObject("/Lang"): TextStringObject("en"),
            NameObject("/MarkInfo"): DictionaryObject({NameObject("/Marked"): BooleanObject(True)}),
        }
    )
    with OUTPUT_PDF.open("wb") as fh:
        writer.write(fh)
    shutil.copy2(OUTPUT_PDF, PUBLIC_PDF)
    return PUBLIC_PDF


def guard_content() -> None:
    text = "\n".join(
        [
            "tecMAMBO",
            f"Media Kit {YEAR}",
            "Made to be understood.",
            "Partner with the tech publication built on clarity.",
            "Hello. We are tecMAMBO.",
            "Why partner with tecMAMBO",
            "Our audience",
            "What we publish",
            "Ways to partner",
            "Specifications",
            "Rate guide",
            "Honest by design",
            "How it works",
            "Let us make your brand understood.",
        ]
    )
    if "—" in text:
        raise RuntimeError("Em dash found in media-kit content.")
    for bad in ("Tecmambo", "TecMAMBO", "TECMAMBO"):
        if bad in text:
            raise RuntimeError(f"Incorrect brand casing found: {bad}")
    if "[" in text or "]" in text:
        raise RuntimeError("Bracketed placeholder found in media-kit content.")


if __name__ == "__main__":
    guard_content()
    path = generate()
    print(path)
