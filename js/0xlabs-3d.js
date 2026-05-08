/* 0xLabs 3D Logo — Lightweight smooth cross */
(function () {
  if (!document.getElementById('oxlabs-3d')) return;

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import * as THREE from 'https://esm.sh/three@0.164.1';

    const el = document.getElementById('oxlabs-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    camera.position.set(3.2, 2.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(128, 128);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    const cv = renderer.domElement;
    cv.style.width = '64px';
    cv.style.height = '64px';
    cv.style.borderRadius = '12px';
    el.appendChild(cv);

    // Concrete material
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xb8b0c5,
      roughness: 0.85,
      metalness: 0.02,
      clearcoat: 0.03,
      clearcoatRoughness: 0.95,
      flatShading: false,
    });

    const cross = new THREE.Group();
    const R = 0.42, hL = 0.55, seg = 32;

    // Each arm: smooth capsule (CapsuleGeometry = cylinder + 2 hemispheres built-in)
    function addArm(ax) {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(R, hL * 2, 16, seg), mat);
      if (ax === 'x') mesh.rotation.z = Math.PI / 2;
      if (ax === 'z') mesh.rotation.x = Math.PI / 2;
      cross.add(mesh);
    }
    addArm('x'); addArm('y'); addArm('z');

    // Large center sphere — blends the arms visually
    cross.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.4, seg, seg), mat));

    // Tilt to match Spline default angle
    cross.rotation.x = 0.35;
    cross.rotation.z = 0.15;
    scene.add(cross);

    // Studio lighting
    scene.add(new THREE.AmbientLight(0x9898b0, 0.55));

    const key = new THREE.DirectionalLight(0xfff5ee, 1.8);
    key.position.set(5, 8, 5);
    scene.add(key);

    const purple = new THREE.DirectionalLight(0x8855bb, 1.1);
    purple.position.set(2, 3, -4);
    scene.add(purple);

    const blue = new THREE.DirectionalLight(0x5580bb, 0.5);
    blue.position.set(-6, 1, 3);
    scene.add(blue);

    const rim = new THREE.DirectionalLight(0x6655aa, 0.3);
    rim.position.set(0, -5, 0);
    scene.add(rim);

    // Slow rotation
    (function animate() {
      requestAnimationFrame(animate);
      cross.rotation.y += 0.004;
      renderer.render(scene, camera);
    })();
  `;
  document.body.appendChild(mod);
})();
