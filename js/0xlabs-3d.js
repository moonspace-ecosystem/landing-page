/* 0xLabs 3D Logo — Spline Runtime (exact replica, scaled down) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  // Render at 256px then scale to 64px (0.25) — object naturally centers in Spline
  canvas.style.cssText = 'width:256px;height:256px;display:block;transform-origin:0 0;transform:scale(0.25);pointer-events:none;';
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
