/* ═══════════════════════════════════════════
   0xLabs 3D Logo — Three.js Recreation
   Renders the iconic X-shaped concrete 3D form
   ═══════════════════════════════════════════ */
(function () {
  const container = document.getElementById('oxlabs-3d');
  if (!container) return;

  const W = 64, H = 64;

  // Import Three.js
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/three@0.164.1/build/three.module.js';
  script.type = 'module';

  // Use module approach
  const moduleScript = document.createElement('script');
  moduleScript.type = 'module';
  moduleScript.textContent = `
    import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

    const container = document.getElementById('oxlabs-3d');
    const W = ${W}, H = ${H};

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W * 2, H * 2); // 2x for retina
    renderer.setPixelRatio(2);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const canvas = renderer.domElement;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    canvas.style.borderRadius = '12px';
    container.appendChild(canvas);

    // Material — concrete/metallic grey-purple
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb8b0c8,
      roughness: 0.65,
      metalness: 0.15,
      envMapIntensity: 0.8,
    });

    // Build cross shape from 3 perpendicular rounded cylinders
    const armRadius = 0.28;
    const armLength = 1.6;
    const segments = 32;

    function createArm(axis) {
      const geo = new THREE.CapsuleGeometry(armRadius, armLength - armRadius * 2, 8, segments);
      const mesh = new THREE.Mesh(geo, mat);
      if (axis === 'x') mesh.rotation.z = Math.PI / 2;
      if (axis === 'z') mesh.rotation.x = Math.PI / 2;
      return mesh;
    }

    const cross = new THREE.Group();
    cross.add(createArm('y')); // vertical
    cross.add(createArm('x')); // horizontal
    cross.add(createArm('z')); // depth

    // Add a sphere at the center for smooth intersection
    const centerGeo = new THREE.SphereGeometry(armRadius * 1.15, segments, segments);
    cross.add(new THREE.Mesh(centerGeo, mat));

    // Add spheres at each arm tip for rounded ends
    const tipPositions = [
      [0, armLength / 2, 0], [0, -armLength / 2, 0],
      [armLength / 2, 0, 0], [-armLength / 2, 0, 0],
      [0, 0, armLength / 2], [0, 0, -armLength / 2],
    ];
    tipPositions.forEach(([x, y, z]) => {
      const tip = new THREE.Mesh(new THREE.SphereGeometry(armRadius, segments, segments), mat);
      tip.position.set(x, y, z);
      cross.add(tip);
    });

    scene.add(cross);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x8888aa, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x9988cc, 0.6);
    fillLight.position.set(-3, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x7c3aed, 0.4);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      cross.rotation.y += 0.005;
      cross.rotation.x += 0.002;
      renderer.render(scene, camera);
    }
    animate();
  `;

  document.body.appendChild(moduleScript);
})();
