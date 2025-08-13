import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function RotatingIcosahedron() {
  const meshRef = useRef<Mesh>(null)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
    }
  })
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial wireframe color="#888" />
    </mesh>
  )
}

export default function Background() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingIcosahedron />
    </Canvas>
  )
}
