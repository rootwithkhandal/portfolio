import os
import re

footer_html = """  <footer>
    <div class="footer-left">
      <a href="/" class="logo" style="text-decoration:none; color:inherit;">0x</a>
      <span style="opacity:0.8;">Priyansh Khandal</span>
    </div>
    <div class="footer-legal" style="display:flex; gap:1rem; opacity:0.8;">
      <a href="/privacy" style="color:inherit; text-decoration:none;">Privacy</a>
      <a href="/tos" style="color:inherit; text-decoration:none;">Terms</a>
      <a href="/cookie-policy" style="color:inherit; text-decoration:none;">Cookies</a>
    </div>
    <span class="dim" style="opacity:0.5;">{currentYear}</span>
  </footer>"""

# Custom one for index.astro because of specific styling
index_footer_html = """  <footer>
    <div class="footer-left" style="display:flex; align-items:center; gap:1rem;">
      <div class="footer-logo">0x</div>
      <p>Priyansh Khandal</p>
    </div>
    <div class="footer-legal" style="display:flex; gap:1rem;">
      <a href="/privacy" style="color:inherit; text-decoration:none;">Privacy</a>
      <a href="/tos" style="color:inherit; text-decoration:none;">Terms</a>
      <a href="/cookie-policy" style="color:inherit; text-decoration:none;">Cookies</a>
    </div>
    <p class="footer-year">khandal.tech · {currentYear}</p>
  </footer>"""

files = [
    'src/pages/index.astro',
    'src/pages/projects/index.astro',
    'src/pages/researches/index.astro',
    'src/layouts/ContentLayout.astro',
    'src/layouts/ErrorLayout.astro'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace footer block
    if file_path == 'src/pages/index.astro':
        new_content = re.sub(r'<footer>.*?</footer>', index_footer_html, content, flags=re.DOTALL)
    else:
        new_content = re.sub(r'<footer>.*?</footer>', footer_html, content, flags=re.DOTALL)
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
