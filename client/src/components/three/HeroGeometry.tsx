import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Floating Node Particles Cloud ───────────────────────────────────────────

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color("#00D4FF");
    const color2 = new THREE.Color("#2E75B6");

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Multi-Layer Futuristic Geometry Core ──────────────────────────────────────

function FuturisticCore() {
  const outerWireRef = useRef<THREE.Mesh>(null);
  const innerSolidRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Mouse tracking & physics state
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const autoRot = useRef({ x: 0, y: 0 });
  const pulseRef = useRef({ scale: 1, velocity: 0 });
  const isHolding = useRef(false);

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

  const handlePointerDown = () => {
    isHolding.current = true;
  };

  const handlePointerUp = () => {
    if (isHolding.current) {
      isHolding.current = false;
      // Spring burst velocity on release
      pulseRef.current.velocity = 0.45;
    }
  };

  // Base geometries (scaled to comfortably fit within canvas bounds)
  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  const innerGeo = useMemo(() => new THREE.DodecahedronGeometry(0.75, 0), []);
  const ringGeo1 = useMemo(() => new THREE.TorusGeometry(1.75, 0.012, 16, 100), []);
  const ringGeo2 = useMemo(() => new THREE.TorusGeometry(2.0, 0.008, 16, 100), []);

  useFrame((state, delta) => {
    const outerWire = outerWireRef.current;
    const innerSolid = innerSolidRef.current;
    const ring1 = ringRef1.current;
    const ring2 = ringRef2.current;
    const group = groupRef.current;
    const innerMat = innerMatRef.current;

    if (!outerWire || !innerSolid || !ring1 || !ring2 || !group) return;

    const safeDelta = Math.min(delta, 0.03);
    const clock = state.clock.getElapsedTime();

    // ── Click & Hold target scaling & charge-up ──
    const targetScale = isHolding.current ? 1.25 : 1.0;
    const rotSpeedMultiplier = isHolding.current ? 2.5 : 1.0;

    const pulse = pulseRef.current;
    const force = (targetScale - pulse.scale) * (isHolding.current ? 160 : 100);
    pulse.velocity += force * safeDelta;
    pulse.velocity *= Math.max(0, 1 - (isHolding.current ? 10 : 18) * safeDelta);
    pulse.scale += pulse.velocity * safeDelta;
    const scaleFactor = isNaN(pulse.scale) || pulse.scale <= 0.2 ? 1 : pulse.scale;
    group.scale.setScalar(scaleFactor);

    // Charge glow intensity
    if (innerMat) {
      const targetEmissive = isHolding.current ? 2.2 : 0.8;
      innerMat.emissiveIntensity += (targetEmissive - innerMat.emissiveIntensity) * 0.1;
    }

    // Continuous & accelerated rotation
    autoRot.current.x += 0.004 * rotSpeedMultiplier;
    autoRot.current.y += 0.006 * rotSpeedMultiplier;

    // Smooth mouse lag
    mouseCurrent.current.x += (mouseTarget.current.y * 0.45 - mouseCurrent.current.x) * 0.06;
    mouseCurrent.current.y += (mouseTarget.current.x * 0.45 - mouseCurrent.current.y) * 0.06;

    const rx = autoRot.current.x + mouseCurrent.current.x;
    const ry = autoRot.current.y + mouseCurrent.current.y;

    outerWire.rotation.x = rx;
    outerWire.rotation.y = ry;

    innerSolid.rotation.x = -rx * 1.2;
    innerSolid.rotation.y = -ry * 1.2;

    // Orbiting concentric rings
    ring1.rotation.x = Math.sin(clock * 0.5 * rotSpeedMultiplier) * 0.5 + ry;
    ring1.rotation.y = clock * 0.4 * rotSpeedMultiplier;

    ring2.rotation.x = clock * 0.3 * rotSpeedMultiplier;
    ring2.rotation.z = Math.cos(clock * 0.6 * rotSpeedMultiplier) * 0.5 + rx;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Inner Glowing Core */}
      <mesh ref={innerSolidRef} geometry={innerGeo}>
        <meshStandardMaterial
          ref={innerMatRef}
          color="#00D4FF"
          emissive="#2E75B6"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Cyan Wireframe Structure */}
      <mesh ref={outerWireRef} geometry={outerGeo}>
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Orbiting Gyro Ring 1 */}
      <mesh ref={ringRef1} geometry={ringGeo1}>
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} />
      </mesh>

      {/* Orbiting Gyro Ring 2 */}
      <mesh ref={ringRef2} geometry={ringGeo2}>
        <meshBasicMaterial color="#2E75B6" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// ─── Canvas Wrapper Component ──────────────────────────────────────────────────

export function HeroGeometry() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      title="Click and hold to charge up 3D energy core"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0) 68%)",
        maskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0) 68%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* Dynamic Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2.0} color="#00D4FF" />
        <pointLight position={[-10, -10, -5]} intensity={1.4} color="#2E75B6" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} color="#FFFFFF" />

        {/* Floating Particles Cloud */}
        <ParticleCloud />

        {/* 3D Cybernetic Core */}
        <FuturisticCore />

        {/* Post-processing Bloom Glow with transparent clear */}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.85}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

