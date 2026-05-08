/* 0xLabs 3D Logo — Spline Runtime + CSS crop */
(function () {
  const el = document.getElementById('oxlabs-3d');
  if (!el) return;

  // Wrapper for CSS sprite cropping
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width:64px;height:64px;overflow:hidden;position:relative;border-radius:12px;flex-shrink:0;background:#0a0a1a;';

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  // Start centered: canvas 200px, offset to center = -(200-64)/2 = -68
  canvas.style.cssText = 'width:200px;height:200px;display:block;position:absolute;top:0;left:0;pointer-events:none;';
  wrapper.appendChild(canvas);

  el.parentNode.replaceChild(wrapper, el);
  wrapper.id = 'oxlabs-3d';

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.61/build/runtime.js';
    const c = document.querySelector('#oxlabs-3d canvas');
    const app = new Application(c);
    app.load('/assets/0xlabs-scene.splinecode').then(() => {
      // After load, find where object renders and log for offset tuning
      setTimeout(() => {
        // Read pixel data to find the 3D object bounds
        const ctx = c.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        const w = c.width, h = c.height;
        const data = ctx.getImageData(0, 0, w, h).data;
        let minX=w, minY=h, maxX=0, maxY=0;
        for (let y=0; y<h; y++) for (let x=0; x<w; x++) {
          const a = data[(y*w+x)*4+3];
          if (a > 10) {
            if (x<minX) minX=x; if (x>maxX) maxX=x;
            if (y<minY) minY=y; if (y>maxY) maxY=y;
          }
        }
        const cx = (minX+maxX)/2, cy = (minY+maxY)/2;
        const scale = 200/w; // CSS pixels per canvas pixel
        const offsetX = -(cx*scale - 32);
        const offsetY = -(cy*scale - 32);
        console.log('Object bounds:', {minX,minY,maxX,maxY,cx,cy,offsetX,offsetY});
        c.style.left = offsetX + 'px';
        c.style.top = offsetY + 'px';
      }, 1000);
    });
  `;
  document.body.appendChild(mod);
})();
