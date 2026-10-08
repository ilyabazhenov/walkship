"""Builds the framed README images in press/readme/ from press/screenshots.

    python3 site/readme-images.py

hero-<lang>-<theme>.png   the Mac window with the phone in front of it
step-<lang>-<screen>-<theme>.png   one phone in a frame, for the «How it works» row
Transparent backgrounds, so each works on GitHub's light and dark pages.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "press" / "screenshots"
OUT = ROOT / "press" / "readme"

EDGE = {"dark": (58, 61, 54, 255), "light": (196, 194, 184, 255)}
BEZEL = (22, 23, 20, 255)


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def with_shadow(img, blur, opacity, offset=(0, 0)):
    pad = blur * 3
    canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    alpha = img.getchannel("A").point(lambda a: int(a * opacity))
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 255))
    shadow.putalpha(alpha)
    canvas.paste(shadow, (pad + offset[0], pad + offset[1]), shadow)
    canvas = canvas.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(img, (pad, pad))
    return canvas, pad


def mac_window(lang, theme, width):
    shot = Image.open(SHOTS / lang / f"mac-home-{theme}.png").convert("RGB")
    shot = shot.resize((width, round(shot.height * width / shot.width)), Image.LANCZOS)
    radius = round(width * 0.012)
    framed = Image.new("RGBA", (shot.width + 2, shot.height + 2), (0, 0, 0, 0))
    ImageDraw.Draw(framed).rounded_rectangle((0, 0, framed.width - 1, framed.height - 1), radius + 1, fill=EDGE[theme])
    framed.alpha_composite(rounded(shot, radius), (1, 1))
    return framed


def phone(lang, screen, theme, width):
    shot = Image.open(SHOTS / lang / f"phone-{screen}-{theme}.png").convert("RGB")
    bezel = round(width * 0.035)
    inner_w = width - bezel * 2
    shot = shot.resize((inner_w, round(shot.height * inner_w / shot.width)), Image.LANCZOS)
    radius = round(width * 0.13)
    body = Image.new("RGBA", (width, shot.height + bezel * 2), (0, 0, 0, 0))
    draw = ImageDraw.Draw(body)
    draw.rounded_rectangle((0, 0, body.width - 1, body.height - 1), radius, fill=EDGE[theme])
    draw.rounded_rectangle((2, 2, body.width - 3, body.height - 3), radius - 2, fill=BEZEL)
    body.alpha_composite(rounded(shot, radius - bezel), (bezel, bezel))
    return body


def save(img, name):
    OUT.mkdir(parents=True, exist_ok=True)
    img = img.convert("RGBA")
    img.save(OUT / name, optimize=True)
    print(name, img.size, (OUT / name).stat().st_size // 1024, "KB")


def hero(lang, theme):
    mac = mac_window(lang, theme, 1600)
    ph = phone(lang, "session", theme, 380)
    mac_s, mac_pad = with_shadow(mac, 28, 0.45, (0, 14))
    ph_s, ph_pad = with_shadow(ph, 24, 0.55, (0, 12))
    mac_at = (0, 0)
    ph_at = (mac.width - ph.width + 170, mac.height - ph.height + 150)
    w = max(mac_at[0] + mac.width, ph_at[0] + ph.width) + max(mac_pad, ph_pad)
    h = max(mac_at[1] + mac.height, ph_at[1] + ph.height) + max(mac_pad, ph_pad)
    canvas = Image.new("RGBA", (w + mac_pad, h + mac_pad), (0, 0, 0, 0))
    canvas.alpha_composite(mac_s, (mac_at[0], mac_at[1]))
    canvas.alpha_composite(ph_s, (ph_at[0] + mac_pad - ph_pad, ph_at[1] + mac_pad - ph_pad))
    save(canvas.crop(canvas.getbbox()), f"hero-{lang}-{theme}.png")


def step(lang, screen, theme):
    ph = phone(lang, screen, theme, 520)
    shadowed, _ = with_shadow(ph, 20, 0.45, (0, 10))
    save(shadowed, f"step-{lang}-{screen}-{theme}.png")


if __name__ == "__main__":
    for lang in ("en", "ru"):
        for theme in ("dark", "light"):
            hero(lang, theme)
            for screen in ("session", "feature-running", "feature-done"):
                step(lang, screen, theme)
