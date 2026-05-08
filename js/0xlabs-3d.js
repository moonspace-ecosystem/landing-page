/* 0xLabs 3D Logo — Spline Runtime (exact replica) */
(function () {
  const container = document.getElementById('oxlabs-3d');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  canvas.style.width = '64px';
  canvas.style.height = '64px';
  canvas.style.borderRadius = '12px';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const canvas = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/neEMPqNv-jfRsJzJZGEtrA32/scene.splinecode');
  `;
  document.body.appendChild(mod);
})();
