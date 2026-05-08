html_file = 'index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the 0xLabs logo img with video
old_img = '<img src="assets/0xlabs-logo.png" alt="0xLabs" style="height: 32px; border-radius: 4px;" class="logo-3d-anim" onerror="this.outerHTML=\'<div style=\\\'font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: var(--font-mono); letter-spacing: -1px;\\\'>0xLabs</div>\';" />'
new_vid = '<video src="assets/0xlabs-3d-logo.webm" autoplay loop muted playsinline style="height: 48px; border-radius: 8px; margin: -8px 0; mix-blend-mode: screen;" class="logo-3d-anim"></video>'
if old_img in content:
    content = content.replace(old_img, new_vid)

# Add Lenis smooth scroll
lenis_script = """  <!-- Smooth Scroll -->
  <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
  <script>
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  </script>
</body>"""

if "lenis.min.js" not in content:
    content = content.replace('</body>', lenis_script)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML updated.")
