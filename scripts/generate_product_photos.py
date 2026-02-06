from __future__ import annotations

import math
import random
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path("/Users/artemcike/Documents/IMI-Labs/FigmaLanding")
OUT_DIR = ROOT / "public" / "products"
SIZE = (1400, 980)

PRODUCTS = [
    {"slug": "ivan-chai-severny", "name": "Иван-чай Северный", "theme": "fireweed"},
    {"slug": "lesnaya-moroshka", "name": "Лесная морошка", "theme": "cloudberry"},
    {"slug": "chernika-i-hvoya", "name": "Черника и хвоя", "theme": "bilberry_pine"},
    {"slug": "taezhnye-travy", "name": "Таёжные травы", "theme": "taiga_herbs"},
    {"slug": "ryabinovy-rassvet", "name": "Рябиновый рассвет", "theme": "rowan"},
    {"slug": "medovy-shipovnik", "name": "Медовый шиповник", "theme": "rosehip"},
    {"slug": "myata-i-severnaya-melissa", "name": "Мята и северная мелисса", "theme": "mint"},
    {"slug": "klyukva-i-veresk", "name": "Клюква и вереск", "theme": "cranberry_heather"},
    {"slug": "sosnovaya-svezhest", "name": "Сосновая свежесть", "theme": "pine"},
    {"slug": "severny-sbor-s-chagoi", "name": "Северный сбор с чагой", "theme": "chaga"},
    {"slug": "ivan-chai-s-brusnikoi", "name": "Иван-чай с брусникой", "theme": "fireweed_lingon"},
    {"slug": "belaya-noch", "name": "Белая ночь", "theme": "white_night"},
]

PALETTES = {
    "fireweed": ((244, 236, 224), (226, 212, 196), (145, 178, 132), (198, 148, 190)),
    "cloudberry": ((245, 236, 224), (223, 204, 176), (142, 166, 126), (225, 156, 82)),
    "bilberry_pine": ((238, 234, 226), (206, 210, 198), (114, 145, 111), (84, 102, 142)),
    "taiga_herbs": ((243, 237, 227), (213, 205, 186), (131, 154, 118), (246, 241, 232)),
    "rowan": ((246, 236, 228), (217, 194, 182), (132, 154, 114), (190, 78, 66)),
    "rosehip": ((242, 234, 224), (216, 193, 167), (132, 152, 114), (192, 89, 70)),
    "mint": ((236, 241, 232), (201, 214, 199), (112, 159, 123), (160, 190, 152)),
    "cranberry_heather": ((240, 233, 224), (210, 198, 184), (127, 145, 112), (175, 70, 88)),
    "pine": ((235, 241, 232), (196, 206, 191), (89, 117, 88), (131, 151, 113)),
    "chaga": ((239, 231, 220), (202, 185, 162), (118, 137, 104), (79, 60, 42)),
    "fireweed_lingon": ((242, 233, 224), (214, 198, 188), (125, 149, 112), (172, 63, 80)),
    "white_night": ((245, 243, 236), (214, 210, 196), (143, 162, 137), (247, 245, 238)),
}


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/SFNS.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def gradient_bg(size: tuple[int, int], c1: tuple[int, int, int], c2: tuple[int, int, int]) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        for x in range(w):
            tx = x / max(1, w - 1)
            ty = y / max(1, h - 1)
            t = 0.65 * tx + 0.35 * ty
            px[x, y] = (
                int(lerp(c1[0], c2[0], t)),
                int(lerp(c1[1], c2[1], t)),
                int(lerp(c1[2], c2[2], t)),
            )
    return img


def add_cloth_texture(base: Image.Image, seed: int) -> Image.Image:
    random.seed(seed)
    w, h = base.size
    texture = Image.effect_noise((w, h), 18).convert("L")
    texture = ImageOps.colorize(texture, (228, 222, 210), (255, 255, 255)).convert("RGB")
    mixed = Image.blend(base, texture, 0.18)

    folds = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(folds)
    for _ in range(18):
        x0 = random.randint(-120, w // 3)
        y0 = random.randint(int(h * 0.55), h + 120)
        x1 = random.randint(w // 3, w)
        y1 = random.randint(int(h * 0.45), h + 180)
        x2 = random.randint(w // 2, w + 200)
        y2 = random.randint(int(h * 0.55), h + 200)
        color = (196, 186, 172, random.randint(20, 45))
        d.line([(x0, y0), (x1, y1), (x2, y2)], fill=color, width=random.randint(2, 5), joint="curve")
    folds = folds.filter(ImageFilter.GaussianBlur(5.5))
    mixed = Image.alpha_composite(mixed.convert("RGBA"), folds).convert("RGB")

    spot = Image.new("L", (w, h), 0)
    ds = ImageDraw.Draw(spot)
    ds.ellipse((260, 120, w - 260, h - 170), fill=195)
    spot = spot.filter(ImageFilter.GaussianBlur(150))
    hi = Image.new("RGB", (w, h), (255, 252, 246))
    mixed = Image.composite(hi, mixed, spot)

    vignette = Image.new("L", (w, h), 0)
    dv = ImageDraw.Draw(vignette)
    dv.rectangle((0, 0, w, h), fill=170)
    dv.ellipse((-220, -180, w + 220, h + 160), fill=0)
    vignette = vignette.filter(ImageFilter.GaussianBlur(120))
    edges = Image.new("RGB", (w, h), (210, 202, 192))
    return Image.composite(edges, mixed, vignette)


def alpha_paste(base: Image.Image, overlay: Image.Image, x: int, y: int) -> None:
    base.alpha_composite(overlay, (x, y))


def draw_leaf(layer: Image.Image, x: int, y: int, rw: int, rh: int, angle: float, color: tuple[int, int, int], alpha: int = 235) -> None:
    patch = Image.new("RGBA", (rw * 4, rh * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(patch)
    box = (rw, rh, rw * 3, rh * 3)
    d.ellipse(box, fill=(*color, alpha))
    d.line((rw * 2, rh, rw * 2, rh * 3), fill=(255, 255, 255, 58), width=max(1, rw // 10))
    patch = patch.filter(ImageFilter.GaussianBlur(0.7)).rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    alpha_paste(layer, patch, int(x - patch.width / 2), int(y - patch.height / 2))


def draw_berries(layer: Image.Image, points: Iterable[tuple[int, int]], radius: int, color: tuple[int, int, int]) -> None:
    d = ImageDraw.Draw(layer)
    for x, y in points:
        d.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(*color, 244))
        d.ellipse((x - radius + 3, y - radius + 3, x - radius + radius // 2 + 2, y - radius + radius // 2 + 2), fill=(255, 255, 255, 85))


def draw_flower(layer: Image.Image, x: int, y: int, r: int, petal: tuple[int, int, int], center: tuple[int, int, int]) -> None:
    for i in range(7):
        a = (math.pi * 2 * i) / 7
        px = int(x + math.cos(a) * r)
        py = int(y + math.sin(a) * r)
        draw_leaf(layer, px, py, int(r * 0.75), int(r * 0.42), math.degrees(a), petal, 220)
    d = ImageDraw.Draw(layer)
    d.ellipse((x - int(r * 0.46), y - int(r * 0.46), x + int(r * 0.46), y + int(r * 0.46)), fill=(*center, 236))


def draw_stems(layer: Image.Image, stems: list[tuple[tuple[int, int], tuple[int, int], tuple[int, int]]], color: tuple[int, int, int]) -> None:
    d = ImageDraw.Draw(layer)
    for p1, p2, p3 in stems:
        d.line([p1, p2, p3], fill=(*color, 210), width=4, joint="curve")


def draw_pouch(base: Image.Image, title: str, accent: tuple[int, int, int]) -> None:
    w, h = base.size
    pouch = Image.new("RGBA", (510, 700), (0, 0, 0, 0))
    d = ImageDraw.Draw(pouch)
    d.rounded_rectangle((22, 16, 488, 686), radius=64, fill=(243, 235, 223, 255), outline=(226, 214, 197, 255), width=3)
    d.rounded_rectangle((58, 86, 452, 235), radius=30, fill=(251, 245, 236, 235))
    d.rectangle((95, 325, 415, 328), fill=(217, 203, 184, 190))
    d.ellipse((180, 395, 330, 545), fill=(233, 220, 204, 210))

    t_font = font(50)
    s_font = font(20)
    l_font = font(24)
    d.text((255, 132), "Tapiola", font=t_font, anchor="mm", fill=(95, 75, 57, 255))
    d.text((255, 180), "KARELIA TEA", font=s_font, anchor="mm", fill=(127, 108, 84, 230))

    title_short = title if len(title) <= 18 else title[:18] + "…"
    d.text((255, 590), title_short, font=l_font, anchor="mm", fill=(*accent, 225))

    shadow = Image.new("RGBA", pouch.size, (0, 0, 0, 0))
    sm = Image.new("L", pouch.size, 0)
    ds = ImageDraw.Draw(sm)
    ds.rounded_rectangle((22, 16, 488, 686), radius=64, fill=150)
    sm = sm.filter(ImageFilter.GaussianBlur(28))
    shadow.putalpha(sm)
    shadow_rgb = Image.new("RGBA", pouch.size, (86, 68, 52, 0))
    shadow_rgb.putalpha(sm)

    x = (w - pouch.width) // 2
    y = 152
    alpha_paste(base, shadow_rgb, x + 3, y + 19)
    alpha_paste(base, pouch, x, y)


def draw_theme_bouquet(base: Image.Image, theme: str, leaf_color: tuple[int, int, int], accent: tuple[int, int, int]) -> None:
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw_stems(
        layer,
        [
            ((238, 912), (332, 744), (416, 548)),
            ((1158, 912), (1066, 744), (982, 548)),
        ],
        tuple(max(40, c - 26) for c in leaf_color),
    )

    clusters = {
        "fireweed": [(430, 510), (972, 510)],
        "cloudberry": [(430, 520), (970, 520)],
        "bilberry_pine": [(438, 520), (962, 520)],
        "taiga_herbs": [(430, 520), (970, 520)],
        "rowan": [(430, 522), (970, 522)],
        "rosehip": [(430, 524), (970, 524)],
        "mint": [(430, 522), (970, 522)],
        "cranberry_heather": [(434, 522), (966, 522)],
        "pine": [(434, 524), (966, 524)],
        "chaga": [(440, 530), (960, 530)],
        "fireweed_lingon": [(430, 520), (970, 520)],
        "white_night": [(430, 518), (970, 518)],
    }

    for cx, cy in clusters[theme]:
        for i in range(6):
            dx = (i - 2.5) * 26
            draw_leaf(layer, int(cx + dx), cy + i * 10, 22, 58, (-24 + i * 10) if cx < 700 else (24 - i * 10), leaf_color, 218)

    if theme in {"cloudberry", "rowan", "rosehip", "cranberry_heather", "fireweed_lingon", "bilberry_pine"}:
        berry_color = accent
        if theme == "bilberry_pine":
            berry_color = (80, 98, 146)
        pts = [
            (462, 525), (420, 568), (384, 607), (936, 525), (980, 568), (1014, 607),
        ]
        draw_berries(layer, pts, 18 if theme != "cranberry_heather" else 15, berry_color)

    if theme in {"fireweed", "fireweed_lingon"}:
        draw_flower(layer, 452, 478, 22, (197, 150, 194), (230, 208, 165))
        draw_flower(layer, 948, 478, 22, (197, 150, 194), (230, 208, 165))

    if theme in {"taiga_herbs", "white_night", "rosehip", "cranberry_heather"}:
        petal = (247, 243, 235) if theme == "white_night" else (236, 228, 212)
        if theme == "cranberry_heather":
            petal = (186, 151, 208)
        draw_flower(layer, 454, 484, 18, petal, (224, 197, 152))
        draw_flower(layer, 946, 484, 18, petal, (224, 197, 152))

    if theme in {"pine", "bilberry_pine"}:
        d = ImageDraw.Draw(layer)
        for i in range(9):
            d.line((390 + i * 12, 645 - i * 26, 308 + i * 4, 618 - i * 26), fill=(70, 95, 71, 204), width=3)
            d.line((1010 - i * 12, 645 - i * 26, 1092 - i * 4, 618 - i * 26), fill=(70, 95, 71, 204), width=3)

    if theme == "mint":
        for i in range(8):
            draw_leaf(layer, 366 + i * 20, 628 - i * 11, 24, 66, -28 + i * 8, (116, 166, 124), 220)
            draw_leaf(layer, 1034 - i * 20, 628 - i * 11, 24, 66, 28 - i * 8, (116, 166, 124), 220)

    if theme == "chaga":
        d = ImageDraw.Draw(layer)
        chunks = [(467, 530), (426, 570), (934, 530), (973, 570)]
        for x, y in chunks:
            d.polygon(
                [(x - 34, y - 21), (x + 26, y - 29), (x + 43, y + 11), (x + 10, y + 34), (x - 35, y + 13)],
                fill=(78, 62, 46, 235),
                outline=(108, 88, 68, 235),
            )

    layer = layer.filter(ImageFilter.GaussianBlur(0.4))

    shadow_mask = layer.split()[-1].filter(ImageFilter.GaussianBlur(17))
    shadow = Image.new("RGBA", layer.size, (64, 52, 40, 0))
    shadow.putalpha(ImageChops.multiply(shadow_mask, Image.new("L", layer.size, 115)))
    alpha_paste(base, shadow, 0, 14)
    alpha_paste(base, layer, 0, 0)


def render_product(slug: str, name: str, theme: str) -> None:
    c1, c2, leaf_color, accent = PALETTES[theme]
    img = gradient_bg(SIZE, c1, c2)
    img = add_cloth_texture(img, seed=abs(hash(slug)) % 100_000)
    img = img.convert("RGBA")

    draw_theme_bouquet(img, theme, leaf_color, accent)
    draw_pouch(img, name, accent)

    # Subtle studio grain
    grain = Image.effect_noise(SIZE, 8).convert("L")
    grain = ImageOps.colorize(grain, (210, 204, 194), (255, 255, 255)).convert("RGBA")
    img = Image.blend(img, grain, 0.08)

    # Fine border vignette
    w, h = SIZE
    vignette = Image.new("L", SIZE, 0)
    dv = ImageDraw.Draw(vignette)
    dv.rectangle((0, 0, w, h), fill=150)
    dv.rounded_rectangle((36, 34, w - 36, h - 34), radius=30, fill=0)
    vignette = vignette.filter(ImageFilter.GaussianBlur(42))
    edge = Image.new("RGBA", SIZE, (209, 198, 184, 255))
    img = Image.composite(edge, img, vignette)

    out = OUT_DIR / f"{slug}.webp"
    img.convert("RGB").save(out, format="WEBP", quality=92, method=6)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for product in PRODUCTS:
        render_product(product["slug"], product["name"], product["theme"])
    print(f"generated {len(PRODUCTS)} photos in {OUT_DIR}")


if __name__ == "__main__":
    main()
