import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function Layer({
  y,
  radius,
  height,
  color,
  delay,
  roughness = 0.6,
  metalness = 0.1,
  emissive,
}: {
  y: number;
  radius: number;
  height: number;
  color: string;
  delay: number;
  roughness?: number;
  metalness?: number;
  emissive?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const start = useRef(performance.now() / 1000 + delay);
  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000 - start.current;
    if (t < 0) {
      ref.current.position.y = y + 5;
      ref.current.scale.set(0.001, 0.001, 0.001);
      return;
    }
    const e = Math.min(1, t / 0.8);
    const eased = 1 - Math.pow(1 - e, 4);
    // bounce
    const bounce = e < 1 ? Math.sin(e * Math.PI * 2) * 0.15 * (1 - e) : 0;
    ref.current.position.y = y + (1 - eased) * 5 + bounce;
    ref.current.scale.setScalar(eased);
  });
  return (
    <mesh ref={ref} castShadow receiveShadow position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius * 0.97, height, 64]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? "#000"}
        emissiveIntensity={emissive ? 0.25 : 0}
      />
    </mesh>
  );
}

function SesameSeeds() {
  const seeds = Array.from({ length: 28 }).map((_, i) => {
    const a = (i / 28) * Math.PI * 2 + (i % 3);
    const r = 0.4 + (i % 4) * 0.18;
    return { x: Math.cos(a) * r, z: Math.sin(a) * r, y: 1.42 + (i % 2) * 0.04 };
  });
  return (
    <group>
      {seeds.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} rotation={[0, i, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#fff4c2" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function BurgerGroup() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* top bun */}
      <mesh castShadow position={[0, 1.25, 0]}>
        <sphereGeometry args={[1.35, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d98b3a" roughness={0.75} />
      </mesh>
      <SesameSeeds />
      <Layer y={0.95} radius={1.35} height={0.12} color="#f2c14e" delay={0.9} /> {/* cheese */}
      <Layer y={0.78} radius={1.3} height={0.28} color="#4a2a17" delay={0.6} roughness={0.9} /> {/* patty */}
      <Layer y={0.55} radius={1.4} height={0.12} color="#3aa84a" delay={0.4} /> {/* lettuce */}
      <Layer y={0.4} radius={1.3} height={0.12} color="#c0392b" delay={0.25} emissive="#7a1a10" /> {/* tomato */}
      {/* bottom bun */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.3, 1.15, 0.45, 64]} />
        <meshStandardMaterial color="#c97a2f" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Burger3D({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={className}
    >
      <Canvas shadows camera={{ position: [0, 1.4, 5.2], fov: 38 }} dpr={[1, 2]}>
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={2}
          color="#ffb070"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, -2]} intensity={2.5} color="#ff4500" />
        <pointLight position={[3, -1, 2]} intensity={1.2} color="#ffd700" />
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
          <BurgerGroup />
        </Float>
        <ContactShadows position={[0, -0.6, 0]} opacity={0.65} blur={2.4} scale={8} far={4} />
        <Environment preset="sunset" />
      </Canvas>
    </motion.div>
  );
}

export default Burger3D;