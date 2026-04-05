import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Sparkles, Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { skillsData } from '../../utils/resumeData'
import { motion, AnimatePresence } from 'framer-motion'

function SkillParticle({ skill, position, onClick, isExpanded }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        scale={hovered || isExpanded ? 1.3 : 1}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={hovered || isExpanded ? 0.8 : 0.3}
          metalness={0.6} roughness={0.2} transparent opacity={0.9} />
      </mesh>
      <Html distanceFactor={10}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          className={`font-mono text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none ${hovered || isExpanded ? 'bg-cyber-surface/90 border border-neon-cyan text-neon-cyan' : 'bg-cyber-surface/70 text-gray-300'}`}
          style={{ boxShadow: hovered || isExpanded ? '0 0 10px #00f5ff' : 'none', transform: 'translateY(-20px)' }}>
          {skill.name}
        </motion.div>
      </Html>
      <AnimatePresence>
        {isExpanded && (
          <Html distanceFactor={8}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 w-[calc(100vw-3rem)] max-w-xs p-4 bg-cyber-surface/95 border border-neon-purple rounded-lg backdrop-blur-sm z-50"
              style={{ boxShadow: '0 0 30px rgba(157, 78, 221, 0.5)' }} onClick={(e) => e.stopPropagation()}>
              <h4 className="font-display font-bold text-neon-purple mb-2">{skill.name}</h4>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono">Proficiency</span>
                  <span className="font-mono text-neon-cyan">{skill.proficiency}%</span>
                </div>
                <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }} animate={{ width: `${skill.proficiency}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
                </div>
              </div>
              <p className="font-mono text-xs text-gray-300 leading-relaxed">{skill.description}</p>
              <button onClick={(e) => { e.stopPropagation(); onClick() }}
                className="mt-3 w-full py-1 text-xs font-mono bg-neon-purple/20 border border-neon-purple/50 rounded hover:bg-neon-purple/30 transition-colors">
                [CLOSE]
              </button>
            </motion.div>
          </Html>
        )}
      </AnimatePresence>
    </group>
  )
}

function ParticleSystem() {
  const { viewport } = useThree()
  const [expandedSkill, setExpandedSkill] = useState(null)
  
  const positions = useMemo(() => {
    return skillsData.map((_, index) => {
      const angle = (index / skillsData.length) * Math.PI * 2
      const radius = Math.min(viewport.width, viewport.height) * 0.3
      return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(angle * 2) * 0.5]
    })
  }, [viewport, skillsData.length])

  return (
    <>
      <Sparkles count={100} scale={viewport.width * 0.8} size={1} speed={0.015} color="#00f5ff" opacity={0.3} />
      {skillsData.map((skill, index) => (
        <SkillParticle key={skill.id} skill={skill} position={positions[index]}
          onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
          isExpanded={expandedSkill === skill.id} />
      ))}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial color="#9d4edd" emissive="#9d4edd" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="#00f5ff" anchorX="center" anchorY="middle">
        TECHNICAL SKILLS
      </Text>
    </>
  )
}

export default function ParticleHub() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
        <ParticleSystem />
      </Canvas>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-neon-cyan/70 text-center pointer-events-none">
        <p>Click any node to view details • Drag to rotate view</p>
      </div>
    </div>
  )
}