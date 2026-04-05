import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, Sparkles, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function CyberBrain({ modelPath = '/portfolio/cyber-brain.glb' }) {
  const robotRef = useRef()
  const { mouse, viewport, size } = useThree()
  const isMobile = size.width < 768
  const responsiveScale = isMobile ? 0.35 : 1.3
  const responsivePosY = isMobile ? -2.2 : -1.2
  const responsiveIntensity = isMobile ? 0.2 : 0.8
  
  // ✅ Handle missing model gracefully
  const { scene, isLoading, error } = useGLTF(modelPath)

  // Apply neon materials when model loads
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone()
          child.material.emissive = new THREE.Color('#0066ff')
          child.material.emissiveIntensity = responsiveIntensity
          child.material.metalness = 0.9
          child.material.roughness = 0.2
        }
      })
    }
  }, [scene])

  useFrame((state) => {
    if (!robotRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle breathing animation
    const breathScale = 1 + Math.sin(time * 0.5) * 0.02
    robotRef.current.scale.setScalar(breathScale)
    
    // Slow rotation
    robotRef.current.rotation.y = time * 0.25
    
    // Mouse tilt effect (subtle)
    const tiltX = (mouse.y * viewport.height) / 30
    const tiltY = (mouse.x * viewport.width) / 30
    robotRef.current.rotation.x = THREE.MathUtils.lerp(
      robotRef.current.rotation.x, 
      tiltX * 0.1, 
      0.05
    )
    robotRef.current.rotation.y = THREE.MathUtils.lerp(
      robotRef.current.rotation.y, 
      time * 0.1 + tiltY * 0.1, 
      0.05
    )
  })

  // ✅ Loading state
  if (isLoading) {
    return (
      <Html center>
        <div className="font-mono text-neon-cyan text-sm animate-pulse">
          Loading AI Core...
        </div>
      </Html>
    )
  }

  // ✅ Error fallback - procedural brain if model fails
  if (error || !scene) {
    return <ProceduralBrain />
  }

  return (
    <group ref={robotRef} position={[0, responsivePosY, 0]} scale={responsiveScale}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <primitive object={scene} />
        <Sparkles count={80} scale={4} size={3} speed={0.02} color="#00f5ff" opacity={0.5} />
      </Float>
    </group>
  )
}

// ✅ Fallback: Procedural brain (works without GLB file)
function ProceduralBrain() {
  const groupRef = useRef()
  
  const isMobile = useThree(state => state.size.width < 768)
  const responsivePosY = isMobile ? -0.8 : -1.2
  
  return (
    <group ref={groupRef} position={[0, responsivePosY, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Core sphere */}
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial 
            color="#00f5ff" 
            emissive="#0066ff"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Wireframe neural network */}
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.3} />
        </mesh>
        
        {/* Particles */}
        <Sparkles count={100} scale={3.5} size={2} speed={0.02} color="#00f5ff" opacity={0.6} />
        
        {/* Outer glow */}
        <mesh scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      </Float>
    </group>
  )
}

// Preload (won't crash if file missing)
try {
  useGLTF.preload('/portfolio/cyber-brain.glb')
} catch (e) {
  // Silent fail - procedural fallback will handle
}