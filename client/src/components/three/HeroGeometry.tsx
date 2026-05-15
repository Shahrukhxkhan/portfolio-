import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Wireframe } from "@react-three/drei";
import * as THREE from "three";

interface HeroGeometryProps {
  mouseX?: number;
  mouseY?: number;
}

function RotatingGeometry({ mouseX = 0, mouseY = 0 }: HeroGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Continuous rotation
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z += 0.002;

    // Mouse interaction
    meshRef.current.rotation.x += mouseRef.current.y * 0.0005;
    meshRef.current.rotation.y += mouseRef.current.x * 0.0005;
  });

  return (
    <group ref={meshRef}>
      <Icosahedron args={[2, 4]}>
        <meshPhongMaterial
          color="#2E75B6"
          emissive="#00D4FF"
          emissiveIntensity={0.3}
          wireframe={false}
          shininess={100}
        />
        <Wireframe
          color="#00D4FF"
          colorMap={undefined}
          thickness={0.005}
        />
      </Icosahedron>

      {/* Glow effect using point light */}
      <pointLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#00D4FF"
      />
      <pointLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#2E75B6"
      />
      <ambientLight intensity={0.4} />
    </group>
  );
}

export function HeroGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <RotatingGeometry
          mouseX={mouseRef.current.x}
          mouseY={mouseRef.current.y}
        />
      </Canvas>
    </div>
  );
}
