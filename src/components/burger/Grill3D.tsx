import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Embers() {
  const ref = useRef<THREE.Points>(null!);
  const count = 250;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = Math.random() * -1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    speeds[i] = 0.5 + Math.random() * 1.5;
  }
  useFrame((_, dt) => {
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + dt * speeds[i];
      let x = pos.getX(i) + Math.sin(y * 2 + i) * dt * 0.2;
      if (y > 3) {
        y = -1;
        x = (Math.random() - 0.5) * 4;
      }
      pos.setX(i, x);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ff6a1a" size={0.07} transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function GrillBars() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05;
  });
  return (
    <group ref={group} position={[0, -0.8, 0]}>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[(i - 3) * 0.35, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.4} emissive="#ff3300" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.2, 0.2, 2]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#ff4500" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export function Grill3D() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, -0.5, 0]} intensity={4} color="#ff4500" distance={6} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffd700" />
      <GrillBars />
      <Embers />
    </Canvas>
  );
}