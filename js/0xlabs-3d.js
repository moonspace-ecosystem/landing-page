/* 0xLabs 3D Logo — Three.js Concrete Cross */
(function () {
  if (!document.getElementById('oxlabs-3d')) return;

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

    const el = document.getElementById('oxlabs-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(4.5, 3.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(128, 128);
    renderer.setPixelRatio(2);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    const cv = renderer.domElement;
    cv.style.width = '64px';
    cv.style.height = '64px';
    cv.style.borderRadius = '12px';
    el.appendChild(cv);

    // Concrete matte material — cool lavender-gray
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb5adc2,
      roughness: 0.88,
      metalness: 0.02,
    });

    // Dimensions: arm diameter ~45% of total length → very thick stubby arms
    const R = 0.42;       // arm radius (thick)
    const halfL = 0.52;   // half arm length from center (short & stubby)
    const seg = 48;

    const cross = new THREE.Group();

    // Build each arm as cylinder + hemisphere cap at the tip
    function addArm(dir) {
      const g = new THREE.Group();

      // Cylinder body
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(R, R, halfL * 2, seg, 1, true),
        mat
      );
      g.add(cyl);

      // Rounded tip (hemisphere)
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(R, seg, seg / 2, 0, Math.PI * 2, 0, Math.PI / 2),
        mat
      );
      cap.position.y = halfL;
      g.add(cap);

      // Bottom is hidden inside center sphere, no cap needed

      // Orient to correct axis
      if (dir === 'x+') g.rotation.z = -Math.PI / 2;
      if (dir === 'x-') g.rotation.z = Math.PI / 2;
      if (dir === 'y+') { /* default up */ }
      if (dir === 'y-') g.rotation.z = Math.PI;
      if (dir === 'z+') g.rotation.x = Math.PI / 2;
      if (dir === 'z-') g.rotation.x = -Math.PI / 2;

      cross.add(g);
    }

    // 6 arms along ±X, ±Y, ±Z
    ['x+','x-','y+','y-','z+','z-'].forEach(addArm);

    // Large center sphere for organic metaball-like blending
    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.35, seg, seg),
      mat
    );
    cross.add(centerSphere);

    scene.add(cross);

    // Lighting — matching Spline's purple studio setup
    // Soft ambient with lavender tint
    scene.add(new THREE.AmbientLight(0xa0a0b8, 0.5));

    // Main light: top-right, warm white
    const mainL = new THREE.DirectionalLight(0xfff8f0, 1.6);
    mainL.position.set(5, 7, 4);
    scene.add(mainL);

    // Purple/magenta accent from upper-right (key Spline characteristic)
    const purpleL = new THREE.DirectionalLight(0x9966cc, 1.0);
    purpleL.position.set(3, 4, -2);
    scene.add(purpleL);

    // Cool blue fill from left
    const blueL = new THREE.DirectionalLight(0x5588bb, 0.5);
    blueL.position.set(-5, 0, 3);
    scene.add(blueL);

    // Subtle rim light from below for depth
    const rimL = new THREE.DirectionalLight(0x7755aa, 0.3);
    rimL.position.set(0, -5, -3);
    scene.add(rimL);

    // Slow diagonal rotation matching Spline animation
    (function animate() {
      requestAnimationFrame(animate);
      cross.rotation.y += 0.005;
      cross.rotation.x += 0.002;
      renderer.render(scene, camera);
    })();
  `;
  document.body.appendChild(mod);
})();
