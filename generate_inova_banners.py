import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

IMAGES_DIR = 'public/images'
os.makedirs(IMAGES_DIR, exist_ok=True)

# Load Inova Logo
logo_path = os.path.join(IMAGES_DIR, 'inova-logo.png')
inova_logo = Image.open(logo_path).convert('RGBA')

def get_font(size, bold=False):
    font_name = 'segoeuib.ttf' if bold else 'segoeui.ttf'
    font_path = os.path.join(r'C:\Windows\Fonts', font_name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    alt = 'arialbd.ttf' if bold else 'arial.ttf'
    return ImageFont.truetype(os.path.join(r'C:\Windows\Fonts', alt), size)

def create_gradient_bg(w, h, color1, color2, angle=135):
    """Create a smooth 2D gradient background."""
    x = np.linspace(0, 1, w)
    y = np.linspace(0, 1, h)
    xx, yy = np.meshgrid(x, y)
    rad = math.radians(angle)
    proj = xx * math.cos(rad) + yy * math.sin(rad)
    proj = (proj - proj.min()) / (proj.max() - proj.min())
    
    r = (1 - proj) * color1[0] + proj * color2[0]
    g = (1 - proj) * color1[1] + proj * color2[1]
    b = (1 - proj) * color1[2] + proj * color2[2]
    
    rgb = np.stack([r, g, b], axis=-1).astype(np.uint8)
    return Image.fromarray(rgb)

def add_glow_orb(base_img, cx, cy, radius, color, max_alpha=120):
    w, h = base_img.size
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Draw soft radial circle
    steps = 40
    for i in range(steps, 0, -1):
        r = int(radius * (i / steps))
        alpha = int(max_alpha * (1 - (i / steps)) ** 1.5)
        c = (color[0], color[1], color[2], alpha)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=c)
    
    base_rgba = base_img.convert('RGBA')
    return Image.alpha_composite(base_rgba, overlay)

def add_grid_pattern(img, spacing=32, dot_color=(255, 255, 255, 18)):
    w, h = img.size
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(0, w, spacing):
        for y in range(0, h, spacing):
            draw.ellipse((x - 1, y - 1, x + 1, y + 1), fill=dot_color)
    return Image.alpha_composite(img.convert('RGBA'), overlay)

def draw_pill_badge(draw, x, y, text, font, bg_color, border_color, text_color, pad_x=16, pad_y=6):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    w = tw + pad_x * 2
    h = th + pad_y * 2
    
    draw.rounded_rectangle((x, y, x + w, y + h), radius=h//2, fill=bg_color, outline=border_color, width=1)
    # text vertical centering
    tx = x + pad_x
    ty = y + pad_y - bbox[1]
    draw.text((tx, ty), text, font=font, fill=text_color)
    return w, h

print('Helper functions initialized.')

# 1. GENERATE HERO BANNER (1200 x 448)
def generate_hero_banner():
    W, H = 2400, 896  # 2x scale for supersampling
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    
    # Add neon orbs
    bg = add_glow_orb(bg, int(W * 0.15), int(H * 0.3), 600, (240, 66, 153), 90)   # Magenta
    bg = add_glow_orb(bg, int(W * 0.85), int(H * 0.6), 700, (0, 128, 255), 100)  # Electric Blue
    bg = add_glow_orb(bg, int(W * 0.5), int(H * 0.85), 500, (124, 58, 237), 70)  # Purple
    bg = add_grid_pattern(bg, spacing=50, dot_color=(255, 255, 255, 24))
    
    draw = ImageDraw.Draw(bg)
    
    # Place Inova Logo on right side with soft shadow and glow
    logo_sz = 460
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    
    # Glow behind logo
    logo_cx = int(W * 0.78)
    logo_cy = int(H * 0.48)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 360, (240, 66, 153), 110)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 280, (0, 128, 255), 130)
    draw = ImageDraw.Draw(bg)
    
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    
    # Left side: Typography
    font_eyebrow = get_font(32, bold=True)
    font_main = get_font(130, bold=True)
    font_estudio = get_font(130, bold=False)
    font_sub = get_font(42, bold=False)
    font_badge = get_font(28, bold=True)
    
    # Eyebrow pill
    bx, by = int(W * 0.08), int(H * 0.16)
    draw_pill_badge(draw, bx, by, "ESTRUTURA DE CONTINGÊNCIA & ESCALA", font_eyebrow,
                    bg_color=(240, 66, 153, 40), border_color=(240, 66, 153, 140), text_color=(255, 120, 190, 255),
                    pad_x=28, pad_y=12)
    
    # Big Title: "INOVA ESTÚDIO" with gradient look
    ty = int(H * 0.30)
    draw.text((bx, ty), "INOVA", font=font_main, fill=(255, 255, 255, 255))
    bbox_inova = font_main.getbbox("INOVA")
    tx_estudio = bx + (bbox_inova[2] - bbox_inova[0]) + 30
    draw.text((tx_estudio, ty), "ESTÚDIO", font=font_main, fill=(0, 200, 255, 255))
    
    # Subtitle
    sy = ty + 155
    draw.text((bx, sy), "PERFIS AQUECIDOS & BMs FACEBOOK VERIFICADAS", font=font_sub, fill=(200, 210, 230, 255))
    
    # Badges line
    badge_y = sy + 95
    cur_x = bx
    badges = [
        ("✓ BMs ILIMITADAS", (0, 128, 255, 40), (0, 128, 255, 140), (100, 210, 255, 255)),
        ("✓ PERFIS COM FOTO & AMIGOS", (124, 58, 237, 40), (124, 58, 237, 140), (210, 160, 255, 255)),
        ("✓ REPOSIÇÃO IMEDIATA", (34, 197, 94, 40), (34, 197, 94, 140), (130, 245, 170, 255)),
    ]
    for text, bg_c, bord_c, txt_c in badges:
        bw, bh = draw_pill_badge(draw, cur_x, badge_y, text, font_badge, bg_c, bord_c, txt_c, pad_x=24, pad_y=10)
        cur_x += bw + 20
        
    final = bg.resize((1200, 448), Image.Resampling.LANCZOS)
    final.save(os.path.join(IMAGES_DIR, 'adsflowz-store-hero.png'), 'PNG')
    final.save(os.path.join(IMAGES_DIR, 'inova-store-hero.png'), 'PNG')
    print('Hero banner generated successfully!')

# 2. GENERATE META ADS / BM BANNER (960 x 540)
def generate_meta_banner():
    W, H = 1920, 1080  # 2x scale
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    
    # Rich glow mesh
    bg = add_glow_orb(bg, int(W * 0.15), int(H * 0.25), 650, (240, 66, 153), 110) # Magenta
    bg = add_glow_orb(bg, int(W * 0.82), int(H * 0.50), 750, (0, 128, 255), 130)  # Electric Blue
    bg = add_glow_orb(bg, int(W * 0.5), int(H * 0.85), 600, (124, 58, 237), 80)   # Violet
    bg = add_grid_pattern(bg, spacing=60, dot_color=(255, 255, 255, 20))
    
    draw = ImageDraw.Draw(bg)
    
    # Outer neon border card look
    pad = 40
    draw.rounded_rectangle((pad, pad, W - pad, H - pad), radius=48, fill=(20, 22, 30, 160), outline=(240, 66, 153, 90), width=3)
    
    # Right side: Big Inova Emblem with 3D Meta accent
    logo_sz = 520
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    logo_cx = int(W * 0.74)
    logo_cy = int(H * 0.50)
    
    bg = add_glow_orb(bg, logo_cx, logo_cy, 400, (0, 128, 255), 140)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 300, (240, 66, 153), 120)
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    
    draw = ImageDraw.Draw(bg)
    
    # Left side typography
    font_category = get_font(38, bold=True)
    font_h1 = get_font(105, bold=True)
    font_h2 = get_font(75, bold=True)
    font_desc = get_font(42, bold=False)
    font_pill = get_font(30, bold=True)
    
    lx = int(W * 0.08)
    ly = int(H * 0.16)
    
    draw_pill_badge(draw, lx, ly, "INOVA ESTÚDIO • ESTRUTURA OFICIAL", font_category,
                    bg_color=(0, 128, 255, 40), border_color=(0, 128, 255, 140), text_color=(100, 210, 255, 255),
                    pad_x=30, pad_y=12)
    
    # Title
    t1_y = ly + 90
    draw.text((lx, t1_y), "BMs FACEBOOK", font=font_h1, fill=(255, 255, 255, 255))
    t2_y = t1_y + 115
    draw.text((lx, t2_y), "& PERFIS AQUECIDOS", font=font_h2, fill=(240, 66, 153, 255))
    
    # Description
    desc_y = t2_y + 110
    draw.text((lx, desc_y), "Business Managers verificadas prontas para escala.", font=font_desc, fill=(200, 215, 235, 255))
    draw.text((lx, desc_y + 55), "Perfis com fotos, amigos, cookies e 2FA incluso.", font=font_desc, fill=(160, 175, 200, 255))
    
    # Feature Badges
    by = desc_y + 150
    cur_x = lx
    meta_badges = [
        ("⚡ ENTREGA IMEDIATA", (34, 197, 94, 40), (34, 197, 94, 150), (130, 245, 170, 255)),
        ("🛡️ GARANTIA DE REPOSIÇÃO", (240, 66, 153, 40), (240, 66, 153, 150), (255, 140, 200, 255)),
        ("♾️ GASTO ILIMITADO", (0, 128, 255, 40), (0, 128, 255, 150), (100, 210, 255, 255)),
    ]
    for text, bg_c, bord_c, txt_c in meta_badges:
        bw, bh = draw_pill_badge(draw, cur_x, by, text, font_pill, bg_c, bord_c, txt_c, pad_x=26, pad_y=12)
        cur_x += bw + 20
        
    final_desktop = bg.convert('RGB').resize((960, 540), Image.Resampling.LANCZOS)
    final_desktop.save(os.path.join(IMAGES_DIR, 'card-header-meta-optimized.jpg'), 'JPEG', quality=95)
    
    final_mobile = bg.convert('RGB').resize((720, 405), Image.Resampling.LANCZOS)
    final_mobile.save(os.path.join(IMAGES_DIR, 'card-header-meta-mobile.jpg'), 'JPEG', quality=95)
    print('Meta Ads banners generated successfully!')

# 3. GENERATE COMBO BMs BANNER (for meta-packages)
def generate_packages_banner():
    W, H = 1920, 1080
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    bg = add_glow_orb(bg, int(W * 0.2), int(H * 0.3), 700, (124, 58, 237), 120)  # Purple
    bg = add_glow_orb(bg, int(W * 0.75), int(H * 0.6), 750, (240, 66, 153), 120) # Magenta
    bg = add_grid_pattern(bg, spacing=60, dot_color=(255, 255, 255, 20))
    
    draw = ImageDraw.Draw(bg)
    pad = 40
    draw.rounded_rectangle((pad, pad, W - pad, H - pad), radius=48, fill=(20, 22, 30, 160), outline=(124, 58, 237, 100), width=3)
    
    logo_sz = 520
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    logo_cx = int(W * 0.74)
    logo_cy = int(H * 0.50)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 380, (124, 58, 237), 130)
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    draw = ImageDraw.Draw(bg)
    
    font_category = get_font(38, bold=True)
    font_h1 = get_font(105, bold=True)
    font_h2 = get_font(75, bold=True)
    font_desc = get_font(42, bold=False)
    font_pill = get_font(30, bold=True)
    
    lx = int(W * 0.08)
    ly = int(H * 0.16)
    draw_pill_badge(draw, lx, ly, "INOVA ESTÚDIO • PACOTES DE ESCALA", font_category,
                    bg_color=(124, 58, 237, 40), border_color=(124, 58, 237, 140), text_color=(200, 160, 255, 255),
                    pad_x=30, pad_y=12)
    
    t1_y = ly + 90
    draw.text((lx, t1_y), "COMBOS DE BMs", font=font_h1, fill=(255, 255, 255, 255))
    t2_y = t1_y + 115
    draw.text((lx, t2_y), "& CONTINGÊNCIA MULTI-CONTAS", font=font_h2, fill=(168, 85, 247, 255))
    
    desc_y = t2_y + 110
    draw.text((lx, desc_y), "Pacotes com múltiplos administradores e perfis redundantes.", font=font_desc, fill=(200, 215, 235, 255))
    draw.text((lx, desc_y + 55), "Estruturas preparadas para alta volatilidade e esteira contínua.", font=font_desc, fill=(160, 175, 200, 255))
    
    by = desc_y + 150
    cur_x = lx
    badges = [
        ("📦 5x & 10x BMs", (124, 58, 237, 40), (124, 58, 237, 150), (210, 160, 255, 255)),
        ("⚡ PREÇO PROMOCIONAL", (240, 66, 153, 40), (240, 66, 153, 150), (255, 140, 200, 255)),
        ("🛡️ SUPORTE DEDICADO", (0, 128, 255, 40), (0, 128, 255, 150), (100, 210, 255, 255)),
    ]
    for text, bg_c, bord_c, txt_c in badges:
        bw, bh = draw_pill_badge(draw, cur_x, by, text, font_pill, bg_c, bord_c, txt_c, pad_x=26, pad_y=12)
        cur_x += bw + 20
        
    final_desktop = bg.convert('RGB').resize((960, 540), Image.Resampling.LANCZOS)
    final_desktop.save(os.path.join(IMAGES_DIR, 'card-header-meta-packages.jpg'), 'JPEG', quality=95)
    print('Combo BMs banner generated successfully!')

# 4. GENERATE PROXY BANNER
def generate_proxy_banner():
    W, H = 1920, 1080
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    bg = add_glow_orb(bg, int(W * 0.2), int(H * 0.3), 700, (6, 182, 212), 120)   # Cyan
    bg = add_glow_orb(bg, int(W * 0.75), int(H * 0.6), 750, (0, 128, 255), 120)  # Electric Blue
    bg = add_grid_pattern(bg, spacing=60, dot_color=(255, 255, 255, 20))
    
    draw = ImageDraw.Draw(bg)
    pad = 40
    draw.rounded_rectangle((pad, pad, W - pad, H - pad), radius=48, fill=(20, 22, 30, 160), outline=(6, 182, 212, 100), width=3)
    
    logo_sz = 520
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    logo_cx = int(W * 0.74)
    logo_cy = int(H * 0.50)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 380, (6, 182, 212), 130)
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    draw = ImageDraw.Draw(bg)
    
    font_category = get_font(38, bold=True)
    font_h1 = get_font(105, bold=True)
    font_h2 = get_font(75, bold=True)
    font_desc = get_font(42, bold=False)
    font_pill = get_font(30, bold=True)
    
    lx = int(W * 0.08)
    ly = int(H * 0.16)
    draw_pill_badge(draw, lx, ly, "INOVA ESTÚDIO • SEGURANÇA OPERACIONAL", font_category,
                    bg_color=(6, 182, 212, 40), border_color=(6, 182, 212, 140), text_color=(100, 230, 255, 255),
                    pad_x=30, pad_y=12)
    
    t1_y = ly + 90
    draw.text((lx, t1_y), "PROXIES PRIVADOS", font=font_h1, fill=(255, 255, 255, 255))
    t2_y = t1_y + 115
    draw.text((lx, t2_y), "HTTP & SOCKS5 4K", font=font_h2, fill=(6, 182, 212, 255))
    
    desc_y = t2_y + 110
    draw.text((lx, desc_y), "IPs residenciais e dedicados sem histórico de bloqueios.", font=font_desc, fill=(200, 215, 235, 255))
    draw.text((lx, desc_y + 55), "Velocidade máxima e compatibilidade com Dolphin, AdsPower e Lauth.", font=font_desc, fill=(160, 175, 200, 255))
    
    by = desc_y + 150
    cur_x = lx
    badges = [
        ("🔒 IP DEDICADO", (6, 182, 212, 40), (6, 182, 212, 150), (100, 230, 255, 255)),
        ("⚡ 100% UPTIME", (34, 197, 94, 40), (34, 197, 94, 150), (130, 245, 170, 255)),
        ("🌐 BRASIL & EUA", (0, 128, 255, 40), (0, 128, 255, 150), (100, 210, 255, 255)),
    ]
    for text, bg_c, bord_c, txt_c in badges:
        bw, bh = draw_pill_badge(draw, cur_x, by, text, font_pill, bg_c, bord_c, txt_c, pad_x=26, pad_y=12)
        cur_x += bw + 20
        
    final_desktop = bg.convert('RGB').resize((960, 540), Image.Resampling.LANCZOS)
    final_desktop.save(os.path.join(IMAGES_DIR, 'card-header-proxy-optimized.jpg'), 'JPEG', quality=95)
    final_mobile = bg.convert('RGB').resize((720, 405), Image.Resampling.LANCZOS)
    final_mobile.save(os.path.join(IMAGES_DIR, 'card-header-proxy-mobile.jpg'), 'JPEG', quality=95)
    print('Proxy banners generated successfully!')

# 5. GENERATE TIKTOK BANNER
def generate_tiktok_banner():
    W, H = 1920, 1080
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    bg = add_glow_orb(bg, int(W * 0.2), int(H * 0.3), 700, (244, 63, 94), 120)   # Coral
    bg = add_glow_orb(bg, int(W * 0.75), int(H * 0.6), 750, (6, 182, 212), 120)  # Cyan
    bg = add_grid_pattern(bg, spacing=60, dot_color=(255, 255, 255, 20))
    
    draw = ImageDraw.Draw(bg)
    pad = 40
    draw.rounded_rectangle((pad, pad, W - pad, H - pad), radius=48, fill=(20, 22, 30, 160), outline=(244, 63, 94, 100), width=3)
    
    logo_sz = 520
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    logo_cx = int(W * 0.74)
    logo_cy = int(H * 0.50)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 380, (244, 63, 94), 130)
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    draw = ImageDraw.Draw(bg)
    
    font_category = get_font(38, bold=True)
    font_h1 = get_font(105, bold=True)
    font_h2 = get_font(75, bold=True)
    font_desc = get_font(42, bold=False)
    font_pill = get_font(30, bold=True)
    
    lx = int(W * 0.08)
    ly = int(H * 0.16)
    draw_pill_badge(draw, lx, ly, "INOVA ESTÚDIO • TIKTOK ADS", font_category,
                    bg_color=(244, 63, 94, 40), border_color=(244, 63, 94, 140), text_color=(255, 140, 160, 255),
                    pad_x=30, pad_y=12)
    
    t1_y = ly + 90
    draw.text((lx, t1_y), "TIKTOK ADS", font=font_h1, fill=(255, 255, 255, 255))
    t2_y = t1_y + 115
    draw.text((lx, t2_y), "& BUSINESS CENTERS", font=font_h2, fill=(6, 182, 212, 255))
    
    desc_y = t2_y + 110
    draw.text((lx, desc_y), "Contas verificadas para tráfego e esteira no TikTok Ads.", font=font_desc, fill=(200, 215, 235, 255))
    draw.text((lx, desc_y + 55), "Estruturas preparadas para escala rápida e testes de criativos.", font=font_desc, fill=(160, 175, 200, 255))
    
    by = desc_y + 150
    cur_x = lx
    badges = [
        ("🔥 BCs VERIFICADAS", (244, 63, 94, 40), (244, 63, 94, 150), (255, 140, 160, 255)),
        ("⚡ 3 A 30 CONTAS", (6, 182, 212, 40), (6, 182, 212, 150), (100, 230, 255, 255)),
        ("🛡️ GARANTIA TOTAL", (34, 197, 94, 40), (34, 197, 94, 150), (130, 245, 170, 255)),
    ]
    for text, bg_c, bord_c, txt_c in badges:
        bw, bh = draw_pill_badge(draw, cur_x, by, text, font_pill, bg_c, bord_c, txt_c, pad_x=26, pad_y=12)
        cur_x += bw + 20
        
    final_desktop = bg.convert('RGB').resize((960, 540), Image.Resampling.LANCZOS)
    final_desktop.save(os.path.join(IMAGES_DIR, 'card-header-tiktok-optimized.jpg'), 'JPEG', quality=95)
    final_mobile = bg.convert('RGB').resize((720, 405), Image.Resampling.LANCZOS)
    final_mobile.save(os.path.join(IMAGES_DIR, 'card-header-tiktok-mobile.jpg'), 'JPEG', quality=95)
    print('TikTok banners generated successfully!')

# 6. GENERATE GOOGLE ADS BANNER
def generate_google_banner():
    W, H = 1920, 1080
    bg = Image.new('RGBA', (W, H), (14, 14, 17, 255))
    bg = add_glow_orb(bg, int(W * 0.2), int(H * 0.3), 700, (234, 179, 8), 120)    # Amber/Yellow
    bg = add_glow_orb(bg, int(W * 0.75), int(H * 0.6), 750, (59, 130, 246), 120)  # Blue
    bg = add_grid_pattern(bg, spacing=60, dot_color=(255, 255, 255, 20))
    
    draw = ImageDraw.Draw(bg)
    pad = 40
    draw.rounded_rectangle((pad, pad, W - pad, H - pad), radius=48, fill=(20, 22, 30, 160), outline=(234, 179, 8, 100), width=3)
    
    logo_sz = 520
    logo_resized = inova_logo.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    logo_cx = int(W * 0.74)
    logo_cy = int(H * 0.50)
    bg = add_glow_orb(bg, logo_cx, logo_cy, 380, (59, 130, 246), 130)
    bg.paste(logo_resized, (logo_cx - logo_sz // 2, logo_cy - logo_sz // 2), logo_resized)
    draw = ImageDraw.Draw(bg)
    
    font_category = get_font(38, bold=True)
    font_h1 = get_font(105, bold=True)
    font_h2 = get_font(75, bold=True)
    font_desc = get_font(42, bold=False)
    font_pill = get_font(30, bold=True)
    
    lx = int(W * 0.08)
    ly = int(H * 0.16)
    draw_pill_badge(draw, lx, ly, "INOVA ESTÚDIO • GOOGLE ADS", font_category,
                    bg_color=(234, 179, 8, 40), border_color=(234, 179, 8, 140), text_color=(255, 210, 100, 255),
                    pad_x=30, pad_y=12)
    
    t1_y = ly + 90
    draw.text((lx, t1_y), "GOOGLE ADS", font=font_h1, fill=(255, 255, 255, 255))
    t2_y = t1_y + 115
    draw.text((lx, t2_y), "& CONTAS VERIFICADAS", font=font_h2, fill=(59, 130, 246, 255))
    
    desc_y = t2_y + 110
    draw.text((lx, desc_y), "Contas maduras e preparadas para campanhas de Search e Display.", font=font_desc, fill=(200, 215, 235, 255))
    draw.text((lx, desc_y + 55), "Estruturas resistentes com esteira de suporte ativa.", font=font_desc, fill=(160, 175, 200, 255))
    
    by = desc_y + 150
    cur_x = lx
    badges = [
        ("⭐ CONTAS G2", (234, 179, 8, 40), (234, 179, 8, 150), (255, 210, 100, 255)),
        ("⚡ 3 LINHAS ATIVAS", (59, 130, 246, 40), (59, 130, 246, 150), (120, 180, 255, 255)),
        ("🛡️ GARANTIA INOVA", (34, 197, 94, 40), (34, 197, 94, 150), (130, 245, 170, 255)),
    ]
    for text, bg_c, bord_c, txt_c in badges:
        bw, bh = draw_pill_badge(draw, cur_x, by, text, font_pill, bg_c, bord_c, txt_c, pad_x=26, pad_y=12)
        cur_x += bw + 20
        
    final_desktop = bg.convert('RGB').resize((960, 540), Image.Resampling.LANCZOS)
    final_desktop.save(os.path.join(IMAGES_DIR, 'google-ads-banner-optimized.jpg'), 'JPEG', quality=95)
    final_mobile = bg.convert('RGB').resize((720, 405), Image.Resampling.LANCZOS)
    final_mobile.save(os.path.join(IMAGES_DIR, 'google-ads-banner-mobile.jpg'), 'JPEG', quality=95)
    print('Google Ads banners generated successfully!')

# 7. GENERATE PRODUCT BADGES (128x128 icons for product thumbnails)
def generate_product_badges():
    badges_def = [
        ('inova-badge-bm.png', 'BM', (240, 66, 153), (0, 128, 255)),
        ('inova-badge-perfil.png', 'PERFIL', (124, 58, 237), (240, 66, 153)),
        ('inova-badge-combo.png', 'COMBO', (0, 128, 255), (6, 182, 212)),
        ('inova-badge-proxy.png', 'PROXY', (6, 182, 212), (34, 197, 94)),
    ]
    sz = 256
    font = get_font(52, bold=True)
    
    for filename, label, c1, c2 in badges_def:
        im = Image.new('RGBA', (sz, sz), (0, 0, 0, 0))
        draw = ImageDraw.Draw(im)
        
        # Outer rounded rect with gradient feel
        draw.rounded_rectangle((10, 10, sz - 10, sz - 10), radius=56, fill=(20, 22, 32, 240), outline=c1 + (180,), width=4)
        
        # Center inova logo miniature
        mini_logo = inova_logo.resize((100, 100), Image.Resampling.LANCZOS)
        im.paste(mini_logo, (sz//2 - 50, 32), mini_logo)
        
        draw = ImageDraw.Draw(im)
        bbox = font.getbbox(label)
        tw = bbox[2] - bbox[0]
        tx = (sz - tw) // 2
        ty = 150
        draw.text((tx, ty), label, font=font, fill=(255, 255, 255, 255))
        
        out = im.resize((128, 128), Image.Resampling.LANCZOS)
        out.save(os.path.join(IMAGES_DIR, filename), 'PNG')
    print('Product badges generated successfully!')

if __name__ == '__main__':
    generate_hero_banner()
    generate_meta_banner()
    generate_packages_banner()
    generate_proxy_banner()
    generate_tiktok_banner()
    generate_google_banner()
    generate_product_badges()
    print('ALL INOVA ESTÚDIO GRAPHICS GENERATED!')
