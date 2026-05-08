/* 0xLabs 3D Logo — Spline Runtime (large canvas, scaled & cropped perfectly) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  // Make the canvas huge to prevent any clipping from the canvas edges
  canvas.width = 800;
  canvas.height = 800;
  
  // Object is at ~70% left, ~45% top in the Spline scene.
  // We use transform to scale it down, then translate it to center the object.
  // With width:800px and scale(0.18):
  // visual canvas size = 144px.
  // object center X ~ 144 * 0.7 = 100.8px. To center in 64px (target 32), we shift left by ~68px.
  // object center Y ~ 144 * 0.45 = 64.8px. To center in 64px (target 32), we shift up by ~32px.
  canvas.style.cssText = 'width:800px;height:800px;display:block;position:absolute;top:-30px;left:-66px;transform-origin:0 0;transform:scale(0.18);pointer-events:none;';
  wrapper.appendChild(canvas);

  el.parentNode.replaceChild(wrapper, el);

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const c = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(c);
    
    // We do NOT manipulate the 3D scene objects programmatically to avoid pivot/cutoff issues.
    // We let it render naturally, and just CSS-crop the specific part we want.
    app.load('/assets/0xlabs-scene.splinecode');
  `;
  document.body.appendChild(mod);
})();
