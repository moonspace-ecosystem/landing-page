/* 0xLabs 3D Logo — Spline Runtime (centered programmatically) */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'oxlabs-3d';
  // Use a standard 64x64 container, no overflow hack needed if we center it in 3D
  wrapper.style.cssText = 'width:64px;height:64px;position:relative;border-radius:12px;flex-shrink:0;';

  const canvas = document.createElement('canvas');
  // Render slightly larger for retina, then scale down using CSS for crispness
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
      // Find the main 3D object (in Spline it's named 'Cube 2')
      const objects = app.getObjects();
      const crossObj = objects.find(o => o.name === 'Cube 2' || o.type === 'Mesh');
      
      if (crossObj) {
        // Move it perfectly to the center of the 3D world (0, 0, 0)
        crossObj.position.x = 0;
        crossObj.position.y = 0;
        crossObj.position.z = 0;
        
        // Optional: you can even adjust its scale if it's too big/small
        // crossObj.scale.set(0.8, 0.8, 0.8);
      }
      
      // Also shift the camera slightly if needed, but centering the object usually fixes it
      if (app._camera) {
        app._camera.position.x = 0;
        app._camera.position.y = 0;
        // Keep Z distance
      }
    });
  `;
  document.body.appendChild(mod);
})();
