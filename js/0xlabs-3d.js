/* 0xLabs 3D Logo — Spline Runtime (Large canvas + CSS offset) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  // High-res rendering buffer
  canvas.width = 1024;
  canvas.height = 1024;
  
  // Use a very large logical CSS canvas (800x800) so its edges extend far past the 64px wrapper.
  // This completely eliminates the "cut off" issue caused by the canvas borders.
  // With scale(0.25), the visual size is 200x200.
  // The object sits roughly at X=70%, Y=45% in Spline.
  // left: -10% and top: 65% counter-acts this offset to perfectly center it in the 64px box.
  canvas.style.cssText = 'width:800px;height:800px;display:block;position:absolute;top:65%;left:-10%;transform:translate(-50%,-50%) scale(0.25);pointer-events:none;';
  wrapper.appendChild(canvas);

  el.parentNode.replaceChild(wrapper, el);

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const c = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(c);
    app.load('/assets/0xlabs-scene.splinecode');
  `;
  document.body.appendChild(mod);
})();
