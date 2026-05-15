import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

function ParticleSystem({ count = 150 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      angle: number;
    }>
  >([]);
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [count]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation loop
  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Perlin-like noise using sine waves
      p.angle += 0.001;
      p.x += p.vx + Math.sin(p.angle) * 0.001;
      p.y += p.vy + Math.cos(p.angle * 0.7) * 0.001;
      p.z += p.vz + Math.sin(p.angle * 0.5) * 0.001;

      // Scroll parallax
      const parallaxOffset = scrollRef.current * 0.0001 * (i % 3);
      p.y += parallaxOffset;

      // Mouse repulsion
      const mouseWorldX = mouseRef.current.x * 20;
      const mouseWorldY = mouseRef.current.y * 20;
      const dx = p.x - mouseWorldX;
      const dy = p.y - mouseWorldY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 8) {
        const force = (8 - distance) / 8;
        p.x += (dx / distance) * force * 0.3;
        p.y += (dy / distance) * force * 0.3;
      }

      // Boundary wrapping
      if (p.x > 20) p.x = -20;
      if (p.x < -20) p.x = 20;
      if (p.y > 20) p.y = -20;
      if (p.y < -20) p.y = 20;
      if (p.z > 20) p.z = -20;
      if (p.z < -20) p.z = 20;

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Generate positions
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = particlesRef.current[i];
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  }

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.15}
        color="#4A9EDB"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </Points>
  );
}

export function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleSystem count={150} />
      </Canvas>
    </div>
  );
}
