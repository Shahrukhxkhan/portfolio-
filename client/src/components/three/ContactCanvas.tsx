import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SparseParticleMeshProps {
  count?: number;
}

function createGlowTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(56, 189, 248, 0.9)");
  gradient.addColorStop(0.6, "rgba(6, 182, 212, 0.4)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function SparseParticleMesh({ count = 200 }: SparseParticleMeshProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate particle data (positions, initial positions, color attributes, random speeds, phase)
  const { positions, colors, initialData } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const particleMeta = [];

    const colorCyan = new THREE.Color("#06b6d4"); // Vibrant Cyan
    const colorSky = new THREE.Color("#38bdf8");  // Vibrant Sky-blue

    for (let i = 0; i < count; i++) {
      // Coordinates spread across wide hero/contact view
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 32;
      const z = (Math.random() - 0.5) * 25;

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      // Color selection (cyan vs sky-blue)
      const isCyan = Math.random() > 0.45;
      const chosenColor = isCyan ? colorCyan.clone() : colorSky.clone();
      
      // Boost brightness for vivid glow
      chosenColor.multiplyScalar(1.1 + Math.random() * 0.4);

      colorArray[i * 3] = chosenColor.r;
      colorArray[i * 3 + 1] = chosenColor.g;
      colorArray[i * 3 + 2] = chosenColor.b;

      particleMeta.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        speedZ: (Math.random() - 0.5) * 0.01,
        phase: Math.random() * Math.PI * 2,
        frequency: 0.4 + Math.random() * 0.6,
        amplitude: 0.7 + Math.random() * 0.9,
      });
    }

    return {
      positions: posArray,
      colors: colorArray,
      initialData: particleMeta,
    };
  }, [count]);

  const glowTexture = useMemo(() => createGlowTexture(), []);

  // Track mouse for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation Loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !groupRef.current) return;

    // Smooth mouse lerp
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

    // Floating 3D group rotation
    groupRef.current.rotation.y += delta * 0.06 + mouseRef.current.x * 0.0008;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.1 + mouseRef.current.y * 0.0008;
    groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.12) * 0.05;

    // Animate individual particles for floating wave effect
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const meta = initialData[i];

      const floatX = Math.sin(time * meta.frequency + meta.phase) * meta.amplitude * 0.8;
      const floatY = Math.cos(time * meta.frequency * 0.8 + meta.phase) * meta.amplitude;
      const floatZ = Math.sin(time * meta.frequency * 1.2 + meta.phase) * meta.amplitude * 0.5;

      posAttr.setXYZ(
        i,
        meta.baseX + floatX,
        meta.baseY + floatY,
        meta.baseZ + floatZ
      );
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
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
          size={0.65}
          map={glowTexture || undefined}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function ContactCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <SparseParticleMesh count={200} />
      </Canvas>
    </div>
  );
}

export default ContactCanvas;
