/* 0xLabs 3D Logo — Metaball Marching Cubes */
(function () {
  if (!document.getElementById('oxlabs-3d')) return;

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
    import { MarchingCubes } from 'https://unpkg.com/three@0.164.1/examples/jsm/objects/MarchingCubes.js';

    const el = document.getElementById('oxlabs-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(128, 128);
    renderer.setPixelRatio(2);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const cv = renderer.domElement;
    cv.style.width = '64px';
    cv.style.height = '64px';
    cv.style.borderRadius = '12px';
    el.appendChild(cv);

    // Concrete matte material
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xb8b0c5,
      roughness: 0.85,
      metalness: 0.0,
      clearcoat: 0.05,
      clearcoatRoughness: 0.9,
    });

    // Marching Cubes for smooth metaball blending
    const resolution = 48;
    const mc = new MarchingCubes(resolution, mat, true, true, 50000);
    mc.position.set(0, 0, 0);
    mc.scale.set(1.5, 1.5, 1.5);
    mc.isolation = 80;
    mc.enableUvs = false;
    mc.enableColors = false;

    // Place metaballs along 6 arms to form a cross
    function updateBalls(time) {
      mc.reset();

      const strength = 1.2;
      const subtract = 12;
      const armLen = 0.18;

      // Center ball (larger, acts as junction)
      mc.addBall(0.5, 0.5, 0.5, strength * 1.1, subtract);

      // 6 arms: +X, -X, +Y, -Y, +Z, -Z
      // Each arm has 3 balls along its length for smooth taper
      const dirs = [
        [1,0,0], [-1,0,0],
        [0,1,0], [0,-1,0],
        [0,0,1], [0,0,-1]
      ];

      for (const [dx, dy, dz] of dirs) {
        // Inner ball (close to center, blends with junction)
        mc.addBall(
          0.5 + dx * armLen * 0.4,
          0.5 + dy * armLen * 0.4,
          0.5 + dz * armLen * 0.4,
          strength * 0.85, subtract
        );
        // Middle ball
        mc.addBall(
          0.5 + dx * armLen * 0.75,
          0.5 + dy * armLen * 0.75,
          0.5 + dz * armLen * 0.75,
          strength * 0.7, subtract
        );
        // Tip ball (slightly smaller for rounded end)
        mc.addBall(
          0.5 + dx * armLen,
          0.5 + dy * armLen,
          0.5 + dz * armLen,
          strength * 0.55, subtract
        );
      }
    }

    updateBalls(0);

    // Wrap in group for rotation
    const group = new THREE.Group();
    group.add(mc);
    // Tilt to match Spline's default viewing angle
    group.rotation.x = 0.35;
    group.rotation.z = 0.15;
    scene.add(group);

    // Studio lighting — purple/blue tones matching Spline
    scene.add(new THREE.AmbientLight(0x9898b0, 0.6));

    // Main key light — warm white from upper right
    const key = new THREE.DirectionalLight(0xfff5ee, 1.8);
    key.position.set(5, 8, 5);
    scene.add(key);

    // Purple accent — signature Spline look
    const purple = new THREE.DirectionalLight(0x8855bb, 1.2);
    purple.position.set(2, 3, -4);
    scene.add(purple);

    // Cool blue fill from left
    const blue = new THREE.DirectionalLight(0x5580bb, 0.6);
    blue.position.set(-6, 1, 3);
    scene.add(blue);

    // Subtle bottom fill
    const bottom = new THREE.DirectionalLight(0x6655aa, 0.3);
    bottom.position.set(0, -5, 0);
    scene.add(bottom);

    // Animate — slow diagonal rotation
    (function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.004;
      renderer.render(scene, camera);
    })();
  `;
  document.body.appendChild(mod);
})();
