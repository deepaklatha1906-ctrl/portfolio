import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Sparkles, Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { skillsData } from '../../utils/resumeData'
import { motion, AnimatePresence } from 'framer-motion'

function SkillParticle({ skill, position, onClick, isExpanded }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const isMobile = useThree(state => state.size.width < 768)
  const nodeSize = isMobile ? 0.25 : 0.4
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        scale={hovered || isExpanded ? 1.3 : 1}>
        <icosahedronGeometry args={[nodeSize, 1]} />
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
    </group>
  )
}

function ParticleSystem({ expandedSkill, setExpandedSkill }) {
  const { viewport, size } = useThree()
  const isMobile = size.width < 768
  
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
        <motion.group 
          key={skill.id}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <SkillParticle skill={skill} position={positions[index]}
            onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
            isExpanded={expandedSkill === skill.id} />
        </motion.group>
      ))}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[isMobile ? 0.5 : 0.8, isMobile ? 0.1 : 0.2, 16, 32]} />
        <meshStandardMaterial color="#9d4edd" emissive="#9d4edd" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, isMobile ? -1 : -1.5, 0]} fontSize={isMobile ? 0.2 : 0.3} color="#00f5ff" anchorX="center" anchorY="middle">
        TECHNICAL SKILLS
      </Text>
    </>
  )
}

export default function ParticleHub() {
  const [expandedSkillId, setExpandedSkillId] = useState(null)
  const expandedSkill = skillsData.find(s => s.id === expandedSkillId)

  return (
    <div className="h-screen w-full relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
        <ParticleSystem expandedSkill={expandedSkillId} setExpandedSkill={setExpandedSkillId} />
      </Canvas>

      <AnimatePresence>
        {expandedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm p-6 bg-cyber-surface/95 border border-neon-purple rounded-xl backdrop-blur-md pointer-events-auto shadow-neon-double"
              style={{ boxShadow: '0 0 30px rgba(157, 78, 221, 0.4)' }}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-display font-bold text-xl text-neon-purple">{expandedSkill.name}</h4>
                <button 
                  onClick={() => setExpandedSkillId(null)}
                  className="text-white hover:text-neon-cyan transition-colors text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-mono text-gray-400">Mastery Level</span>
                  <span className="font-mono text-neon-cyan">{expandedSkill.proficiency}%</span>
                </div>
                <div className="h-3 bg-cyber-border rounded-full overflow-hidden border border-neon-cyan/20">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }} 
                    animate={{ width: `${expandedSkill.proficiency}%` }} 
                    transition={{ duration: 1, ease: "easeOut" }} 
                  />
                </div>
              </div>
              
              <p className="font-mono text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-48 mb-4">
                {expandedSkill.description}
              </p>
              
              <button 
                onClick={() => setExpandedSkillId(null)}
                className="w-full py-2 font-mono text-sm bg-neon-purple/20 border border-neon-purple/50 rounded hover:bg-neon-purple/30 transition-all duration-300 text-neon-purple-light"
              >
                [ CLOSE_LOGS ]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-neon-cyan/70 text-center pointer-events-none">
        <p>Click any node to view details • Drag to rotate view</p>
      </div>
    </div>
  )
}