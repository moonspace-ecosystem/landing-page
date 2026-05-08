/* 0xLabs 3D Logo — Spline Runtime (exact replica, scaled down) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:56px;height:56px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  // Canvas at 120px CSS. Object center at ~70% left (84px), ~48% top (58px).
  // To center in 56px container: left = 28 - 84 = -56, top = 28 - 58 = -30
  // Then scale(0.5) from center to fit: effective visible area = 56/0.5 = 112px of 120px
  canvas.style.cssText = 'width:120px;height:120px;display:block;position:absolute;top:-2px;left:-52px;pointer-events:none;';
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
