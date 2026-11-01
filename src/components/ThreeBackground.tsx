import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ResolvedTheme, useTheme } from '../theme/ThemeProvider';

// Scene colors per theme; geometry stays identical so switching is instant
const PALETTE: Record<
  ResolvedTheme,
  { fog: number; shadow: number; shadowOpacity: number; particles: number; particleOpacity: number; wire: number; beam: number; core: number; coreEmissive: number }
> = {
  dark: {
    fog: 0x0a0b0f,
    shadow: 0x000000,
    shadowOpacity: 0.55,
    particles: 0xffb08f,
    particleOpacity: 0.45,
    wire: 0xff8c5f,
    beam: 0xff8c5f,
    core: 0x1a1410,
    coreEmissive: 0x3a1206,
  },
  light: {
    fog: 0xf5f3ee,
    shadow: 0x8a7f6a,
    shadowOpacity: 0.16,
    particles: 0xb93d0c,
    particleOpacity: 0.35,
    wire: 0xe8501c,
    beam: 0xe8501c,
    core: 0x2a2420,
    coreEmissive: 0x2a0d04,
  },
};

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolved } = useTheme();
  const applyThemeRef = useRef<((theme: ResolvedTheme) => void) | null>(null);
  const initialTheme = useRef(resolved);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      return; // WebGL unavailable — the hero still renders without the scene
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 1.2s ease';
    container.appendChild(renderer.domElement);

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE[initialTheme.current].fog, 0.035);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.8, 7.2);

    // 4. Procedural Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 5. Lighting — ember key, cobalt fill, mint rim
    const keyLight = new THREE.DirectionalLight(0xffa37a, 2.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x8b9aff, 0x0f1115, 1.1);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x4ade9c, 2.4, 16);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 6. Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(9, 9);
    const shadowMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.2;
    scene.add(shadowMesh);

    // 7. Kinetic Software Architecture Engine
    const coreSystemGroup = new THREE.Group();
    scene.add(coreSystemGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreSystemGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const wireMat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.35 });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreMesh.add(wireMesh);

    const ring1Geo = new THREE.TorusGeometry(2.35, 0.045, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0xc2410c,
      emissiveIntensity: 0.3,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3.5;
    ring1Mesh.rotation.y = Math.PI / 6;
    coreSystemGroup.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b9aff,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x3346d3,
      emissiveIntensity: 0.3,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 5;
    coreSystemGroup.add(ring2Mesh);

    // Satellite pods (Mobile, Web, Desktop, Backend)
    const podGeo = new THREE.OctahedronGeometry(0.24, 0);
    const podGlowGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const podGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const podMaterials: THREE.Material[] = [];

    const podConfigs = [
      { color: 0xff6b35, radius: 2.35, speed: 0.65, angle: 0, inc: 0.6 },
      { color: 0x8b9aff, radius: 2.7, speed: -0.5, angle: Math.PI / 2, inc: -0.4 },
      { color: 0xffb547, radius: 2.1, speed: 0.8, angle: Math.PI, inc: 0.9 },
      { color: 0x4ade9c, radius: 2.5, speed: -0.6, angle: (3 * Math.PI) / 2, inc: -0.7 },
    ];

    const satellitePods = podConfigs.map((cfg) => {
      const podGroup = new THREE.Group();
      const podMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: cfg.color,
        emissiveIntensity: 0.55,
      });
      podMaterials.push(podMat);
      const podMesh = new THREE.Mesh(podGeo, podMat);
      podMesh.add(new THREE.Mesh(podGlowGeo, podGlowMat));
      podGroup.add(podMesh);
      coreSystemGroup.add(podGroup);
      return { group: podGroup, mesh: podMesh, orbitRadius: cfg.radius, orbitSpeed: cfg.speed, angle: cfg.angle, inclination: cfg.inc };
    });

    // Data bus beams
    const beamLinesGeo = new THREE.BufferGeometry();
    beamLinesGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 2 * 3), 3));
    const beamMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.35 });
    coreSystemGroup.add(new THREE.LineSegments(beamLinesGeo, beamMat));

    // Ambient particles
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 12;
      particleCoords[i + 1] = (Math.random() - 0.5) * 8;
      particleCoords[i + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, transparent: true });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Frame the engine behind the portrait on wide screens, centered on narrow ones
    const layout = () => {
      const aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      const visibleHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const wide = aspect > 1.15;
      coreSystemGroup.position.set(wide ? visibleHeight * aspect * 0.22 : 0, wide ? 1.05 : 0.9, 0);
      coreSystemGroup.scale.setScalar(wide ? 0.92 : 0.8);
    };

    const render = () => renderer.render(scene, camera);

    const applyTheme = (theme: ResolvedTheme) => {
      const p = PALETTE[theme];
      (scene.fog as THREE.FogExp2).color.setHex(p.fog);
      shadowMat.color.setHex(p.shadow);
      shadowMat.opacity = p.shadowOpacity;
      particleMat.color.setHex(p.particles);
      particleMat.opacity = p.particleOpacity;
      wireMat.color.setHex(p.wire);
      beamMat.color.setHex(p.beam);
      coreMaterial.color.setHex(p.core);
      coreMaterial.emissive.setHex(p.coreEmissive);
      if (!running) render();
    };

    // 8. Mouse parallax
    const mouseState = { targetRotationX: 0, targetRotationY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseState.targetRotationY = x * 0.4;
      mouseState.targetRotationX = -y * 0.3;
    };
    if (!reduceMotion) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      layout();
      if (!running) render();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 10. Animation loop — runs only while the hero is on screen
    let frameId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const updatePods = (dt: number) => {
      const positions = beamLinesGeo.attributes.position.array as Float32Array;
      satellitePods.forEach((pod, idx) => {
        pod.angle += dt * pod.orbitSpeed;
        const x = Math.cos(pod.angle) * pod.orbitRadius;
        const z = Math.sin(pod.angle) * pod.orbitRadius;
        const y = Math.sin(pod.angle * 1.5 + pod.inclination) * 0.65;
        pod.group.position.set(x, y, z);
        pod.mesh.rotation.x += dt * 1.2;
        pod.mesh.rotation.y += dt * 1.5;
        positions.set([0, 0, 0, x, y, z], idx * 6);
      });
      beamLinesGeo.attributes.position.needsUpdate = true;
    };

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      coreSystemGroup.rotation.y += (mouseState.targetRotationY - coreSystemGroup.rotation.y) * 0.05;
      coreSystemGroup.rotation.x += (mouseState.targetRotationX - coreSystemGroup.rotation.x) * 0.05;
      coreMesh.rotation.y += dt * 0.35;
      coreMesh.rotation.x += dt * 0.18;
      ring1Mesh.rotation.z += dt * 0.3;
      ring2Mesh.rotation.z -= dt * 0.22;
      updatePods(dt);
      particlePoints.rotation.y = elapsed * 0.02;
      particlePoints.rotation.x = Math.sin(elapsed * 0.03) * 0.05;

      render();

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      clock.getDelta(); // drop the paused interval so nothing jumps
      tick();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
    };

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    visibility.observe(container);

    layout();
    applyThemeRef.current = applyTheme;
    applyTheme(initialTheme.current);
    updatePods(0);
    render();
    requestAnimationFrame(() => (renderer.domElement.style.opacity = '1'));

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      applyThemeRef.current = null;

      [coreGeometry, wireGeo, ring1Geo, ring2Geo, podGeo, podGlowGeo, particleGeo, shadowGeo, beamLinesGeo].forEach((g) =>
        g.dispose()
      );
      [coreMaterial, wireMat, ring1Mat, ring2Mat, podGlowMat, particleMat, shadowMat, beamMat, ...podMaterials].forEach(
        (m) => m.dispose()
      );
      envTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  // Recolor the existing scene when the theme changes
  useEffect(() => {
    applyThemeRef.current?.(resolved);
  }, [resolved]);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 h-full w-full select-none" aria-hidden="true" />;
};
