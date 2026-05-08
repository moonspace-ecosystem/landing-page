/* 0xLabs 3D Logo — Spline Runtime + CSS crop */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  // Wrapper for CSS sprite cropping
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.cssText = 'width:200px;height:200px;display:block;position:absolute;top:-68px;left:-68px;pointer-events:none;';
  wrapper.appendChild(canvas);

  // Replace container with wrapper
  el.parentNode.replaceChild(wrapper, el);
  wrapper.id = 'oxlabs-3d';

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const c = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(c);
    app.load('/assets/0xlabs-scene.splinecode').then(() => {
      // Fine-tune: check console for actual object position
      console.log('Spline scene loaded');
    });
  `;
  document.body.appendChild(mod);
})();
