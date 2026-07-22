import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Animated icosahedron mesh ────────────────────────────────────────────────

function IcosahedronMesh() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Raw mouse target (normalized -1..1)
  const mouseTarget = useRef({ x: 0, y: 0 });
  // Smoothed mouse offset (lerped each frame)
  const mouseCurrent = useRef({ x: 0, y: 0 });
  // Accumulated auto-rotation
  const autoRot = useRef({ x: 0, y: 0 });
  // Spring-like scale animation state
  const springState = useRef({ scale: 0, velocity: 0 });

  // Global mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Shared geometry — created once
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), []);

  useFrame((_, delta) => {
    const solid = solidRef.current;
    const wire = wireRef.current;
    const group = groupRef.current;
    if (!solid || !wire || !group) return;

    // ── Spring scale-in (mass=1, tension=80, friction=20) ──
    const target = 1;
    const spring = springState.current;
    const force = (target - spring.scale) * 80; // tension
    spring.velocity += force * delta;
    spring.velocity *= 1 - 20 * delta; // friction damping
    spring.scale += spring.velocity * delta;
    group.scale.setScalar(Math.max(0, spring.scale));

    // ── Continuous auto-rotation ──
    autoRot.current.x += 0.003;
    autoRot.current.y += 0.005;

    // ── Lerp mouse influence toward target (factor 0.05 = smooth lag) ──
    mouseCurrent.current.x +=
      (mouseTarget.current.y * 0.4 - mouseCurrent.current.x) * 0.05;
    mouseCurrent.current.y +=
      (mouseTarget.current.x * 0.4 - mouseCurrent.current.y) * 0.05;

    // ── Apply combined rotation to both meshes ──
    const rx = autoRot.current.x + mouseCurrent.current.x;
    const ry = autoRot.current.y + mouseCurrent.current.y;
    solid.rotation.x = rx;
    solid.rotation.y = ry;
    wire.rotation.x = rx;
    wire.rotation.y = ry;
  });

  return (
    <group ref={groupRef} scale={0}>
      {/* Dark semi-transparent solid fill */}
      <mesh ref={solidRef} geometry={geo}>
        <meshPhongMaterial
          color="#0A1628"
          transparent
          opacity={0.6}
          shininess={100}
        />
      </mesh>

      {/* Cyan wireframe overlay */}
      <mesh ref={wireRef} geometry={geo}>
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

export function HeroGeometry() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#2E75B6" />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#00D4FF" />

        {/* Geometry */}
        <IcosahedronMesh />

        {/* Bloom / glow post-processing */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
