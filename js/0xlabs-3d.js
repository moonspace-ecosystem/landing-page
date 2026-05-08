/* 0xLabs 3D Logo — Metaball Marching Cubes */
(function () {
  if (!document.getElementById('oxlabs-3d')) return;

  const mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = `
    import * as THREE from 'https://esm.sh/three@0.164.1';
    import { MarchingCubes } from 'https://esm.sh/three@0.164.1/examples/jsm/objects/MarchingCubes.js';

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
    const cv = renderer.domElement;
    cv.style.width = '64px';
    cv.style.height = '64px';
    cv.style.borderRadius = '12px';
    el.appendChild(cv);

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xb8b0c5,
      roughness: 0.85,
      metalness: 0.0,
      clearcoat: 0.05,
      clearcoatRoughness: 0.9,
    });

    const resolution = 48;
    const mc = new MarchingCubes(resolution, mat, true, true, 50000);
    mc.scale.set(1.5, 1.5, 1.5);
    mc.isolation = 80;

    mc.reset();
    const s = 1.2, sub = 12, arm = 0.18;
    mc.addBall(0.5, 0.5, 0.5, s * 1.1, sub);

    const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    for (const [dx, dy, dz] of dirs) {
      mc.addBall(0.5+dx*arm*0.4, 0.5+dy*arm*0.4, 0.5+dz*arm*0.4, s*0.85, sub);
      mc.addBall(0.5+dx*arm*0.75, 0.5+dy*arm*0.75, 0.5+dz*arm*0.75, s*0.7, sub);
      mc.addBall(0.5+dx*arm, 0.5+dy*arm, 0.5+dz*arm, s*0.55, sub);
    }

    const group = new THREE.Group();
    group.add(mc);
    group.rotation.x = 0.35;
    group.rotation.z = 0.15;
    scene.add(group);

    scene.add(new THREE.AmbientLight(0x9898b0, 0.6));
    const key = new THREE.DirectionalLight(0xfff5ee, 1.8);
    key.position.set(5, 8, 5);
    scene.add(key);
    const purple = new THREE.DirectionalLight(0x8855bb, 1.2);
    purple.position.set(2, 3, -4);
    scene.add(purple);
    const blue = new THREE.DirectionalLight(0x5580bb, 0.6);
    blue.position.set(-6, 1, 3);
    scene.add(blue);
    const bottom = new THREE.DirectionalLight(0x6655aa, 0.3);
    bottom.position.set(0, -5, 0);
    scene.add(bottom);

    (function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.004;
      renderer.render(scene, camera);
    })();
  `;
  document.body.appendChild(mod);
})();
