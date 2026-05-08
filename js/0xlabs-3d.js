/* 0xLabs 3D Logo — Spline Runtime + CSS sprite crop */
(function () {
  const container = document.getElementById('oxlabs-3d');
  if (!container) return;

  // Container clips to 64x64, canvas renders larger for Spline camera
  container.style.overflow = 'hidden';
  container.style.position = 'relative';
  container.style.borderRadius = '12px';

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  // CSS sprite: render at 200px, offset to center on the 3D object
  canvas.style.width = '200px';
  canvas.style.height = '200px';
  canvas.style.position = 'absolute';
  canvas.style.top = '-68px';
  canvas.style.left = '-100px';
  canvas.style.display = 'block';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const canvas = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(canvas);
    app.load('/assets/0xlabs-scene.splinecode');
  `;
  document.body.appendChild(mod);
})();
