/* 0xLabs 3D Logo — Spline Runtime + CSS crop */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  // Object sits at ~70% from left in Spline scene (140px of 200px CSS)
  // Center of 64px viewport = 32px → left offset = -(140 - 32) = -108
  // Object sits at ~45% from top (90px of 200px) → top = -(90 - 32) = -58
  canvas.style.cssText = 'width:200px;height:200px;display:block;position:absolute;top:-58px;left:-108px;pointer-events:none;';
  wrapper.appendChild(canvas);

  el.parentNode.replaceChild(wrapper, el);
  wrapper.id = 'oxlabs-3d';

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
