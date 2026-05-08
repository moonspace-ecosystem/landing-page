/* 0xLabs 3D Logo — Spline Runtime (centered programmatically via Camera & Object) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  wrapper.style.cssText = 'width:64px;height:64px;position:relative;border-radius:12px;flex-shrink:0;overflow:hidden;background:#1a1a2e;';

  const canvas = document.createElement('canvas');
  // Make the canvas fill the wrapper. Spline will adjust its camera aspect ratio.
  canvas.style.cssText = 'width:100%;height:100%;display:block;outline:none;';
  wrapper.appendChild(canvas);

  el.parentNode.replaceChild(wrapper, el);

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const c = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(c);
    
    app.load('/assets/0xlabs-scene.splinecode').then(() => {
      // Find all objects
      const objects = app.getObjects();
      
      // The 3D cross shape might be named 'Cube 2' or 'Shape'
      const crossObj = objects.find(o => o.name === 'Cube 2' || o.type === 'Mesh');
      if (crossObj) {
        // Try to center it in world space
        crossObj.position.x = 0;
        crossObj.position.y = 0;
      }

      // Spline scenes often have a camera that is panned or zoomed strangely.
      // Let's reset the active camera's position to look straight at the origin.
      if (app._camera) {
        // A typical perspective camera setup:
        app._camera.position.x = 0;
        app._camera.position.y = 0;
        // Keep the existing Z (distance to object) or set a reasonable one
        if (app._camera.position.z > 2000 || app._camera.position.z < 10) {
            app._camera.position.z = 800; // default safe distance
        }
      }
      
      // If we want to adjust the zoom dynamically to fit the 64x64 box
      app.setZoom(0.8); // Zoom out slightly to ensure it's not cut off
    });
  `;
  document.body.appendChild(mod);
})();
