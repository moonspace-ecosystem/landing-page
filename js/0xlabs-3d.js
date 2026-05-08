/* 0xLabs 3D Logo — Three.js Metaball Cross Recreation */
(function () {
  const container = document.getElementById('oxlabs-3d');
  if (!container) return;

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

    const W = 64, H = 64;
    const el = document.getElementById('oxlabs-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W * 2, H * 2);
    renderer.setPixelRatio(2);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    const c = renderer.domElement;
    c.style.width = W + 'px';
    c.style.height = H + 'px';
    c.style.borderRadius = '12px';
    el.appendChild(c);

    // Concrete material
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb0a8be,
      roughness: 0.82,
      metalness: 0.05,
    });

    // Build cross using thick cylinders with hemisphere caps (metaball-like)
    const R = 0.38, L = 1.1, seg = 48;
    const cross = new THREE.Group();

    function arm(axis) {
      // Thick cylinder body
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L, seg, 1, false), mat);
      // Hemisphere caps
      const capGeo = new THREE.SphereGeometry(R, seg, seg, 0, Math.PI * 2, 0, Math.PI / 2);
      const topCap = new THREE.Mesh(capGeo, mat);
      topCap.position.y = L / 2;
      const botCap = new THREE.Mesh(capGeo, mat);
      botCap.position.y = -L / 2;
      botCap.rotation.x = Math.PI;

      const g = new THREE.Group();
      g.add(cyl, topCap, botCap);

      if (axis === 'x') g.rotation.z = Math.PI / 2;
      if (axis === 'z') g.rotation.x = Math.PI / 2;
      return g;
    }

    cross.add(arm('y'), arm('x'), arm('z'));

    // Smooth center sphere (larger to blend arms like metaball)
    cross.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.25, seg, seg), mat));

    scene.add(cross);

    // Lighting to match Spline's purple-blue tones
    scene.add(new THREE.AmbientLight(0x9090a8, 0.7));

    const main = new THREE.DirectionalLight(0xffffff, 1.5);
    main.position.set(4, 6, 5);
    scene.add(main);

    const purple = new THREE.DirectionalLight(0x8866bb, 0.8);
    purple.position.set(-4, -2, 3);
    scene.add(purple);

    const blue = new THREE.DirectionalLight(0x4488cc, 0.3);
    blue.position.set(2, -4, -4);
    scene.add(blue);

    (function animate() {
      requestAnimationFrame(animate);
      cross.rotation.y += 0.006;
      cross.rotation.x += 0.003;
      renderer.render(scene, camera);
    })();
  `;
  document.body.appendChild(mod);
})();
