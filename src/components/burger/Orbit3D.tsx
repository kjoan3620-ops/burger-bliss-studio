import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const INGREDIENTS = [
  { name: "Tomato", color: "#c0392b", info: "Vine-ripened, picked daily" },
  { name: "Lettuce", color: "#3aa84a", info: "Crisp romaine from local farms" },
  { name: "Cheese", color: "#f2c14e", info: "Aged cheddar, melted to order" },
  { name: "Onion", color: "#e8d8c0", info: "Sweet Vidalia, caramelized slow" },
  { name: "Patty", color: "#5a2d18", info: "Grass-fed Angus, 80/20" },
  { name: "Bun", color: "#d98b3a", info: "Brioche, baked in-house" },
];

function Orbiter({ idx, total, onSelect }: { idx: number; total: number; onSelect: (i: number) => void }) {
  const ref = useRef<THREE.Mesh>(null!);
  const ing = INGREDIENTS[idx];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3 + (idx / total) * Math.PI * 2;
    const r = 2.6;
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.z = Math.sin(t) * r;
    ref.current.position.y = Math.sin(t * 2) * 0.4;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.006;
  });
  return (
    <mesh ref={ref} onClick={() => onSelect(idx)} onPointerOver={(e) => (e.stopPropagation(), (document.body.style.cursor = "pointer"))} onPointerOut={() => (document.body.style.cursor = "")}>
      {idx % 2 === 0 ? <icosahedronGeometry args={[0.55, 0]} /> : <dodecahedronGeometry args={[0.55, 0]} />}
      <meshStandardMaterial color={ing.color} roughness={0.5} metalness={0.15} emissive={ing.color} emissiveIntensity={0.15} />
    </mesh>
  );
}

export function Orbit3D({ onSelect }: { onSelect: (info: { name: string; info: string }) => void }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#ff4500" />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#ffd700" />
      {INGREDIENTS.map((_, i) => (
        <Orbiter key={i} idx={i} total={INGREDIENTS.length} onSelect={(idx) => onSelect(INGREDIENTS[idx])} />
      ))}
      <Environment preset="night" />
    </Canvas>
  );
}

export { INGREDIENTS };