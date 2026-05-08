/* 0xLabs 3D Logo — Spline Runtime (Large canvas + CSS transform) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  // 400x400 logical size for high res
  canvas.width = 400;
  canvas.height = 400;
  
  // Render at 300px CSS to give plenty of room so WebGL doesn't clip it internally.
  // Object is at ~70% left = 210px. ~45% top = 135px.
  // With scale(0.35) -> object is at 210 * 0.35 = 73.5px X, and 135 * 0.35 = 47.25px Y.
  // To center in 64px (target 32px):
  // left = 32 - 73.5 = -41.5px
  // top = 32 - 47.25 = -15.25px
  canvas.style.cssText = 'width:300px;height:300px;display:block;position:absolute;top:-15px;left:-42px;transform-origin:0 0;transform:scale(0.35);pointer-events:none;';
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
