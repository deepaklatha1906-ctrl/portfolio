import { useState, useMemo, useEffect } from 'react'
import { skillsData as staticSkills } from '../../utils/resumeData'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchGithubData } from '../../utils/githubApi'

function SkillNode({ skill, x, y, onClick, isExpanded, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ 
        position: 'absolute', 
        left: `${x}%`, 
        top: `${y}%`,
        transform: 'translate(-50%, -50%)' 
      }}
      className="z-10"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.2, boxShadow: `0 0 20px ${skill.color}` }}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-colors
          ${isExpanded ? 'border-white bg-white/20' : 'border-neon-cyan/50 bg-cyber-surface/50'}`}
        style={{ 
          borderColor: isExpanded ? '#fff' : skill.color,
          boxShadow: `0 0 15px ${skill.color}44`
        }}
      >
        <span className="font-display font-bold text-xs md:text-sm text-white text-center px-1">
          {skill.name.split(' ')[0].substring(0, 3).toUpperCase()}
        </span>
      </motion.button>
      
      {/* Label */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="font-mono text-[10px] md:text-xs text-neon-cyan/80 uppercase tracking-widest">
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function ParticleHub() {
  const [expandedSkillId, setExpandedSkillId] = useState(null)
  const [skills, setSkills] = useState(staticSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await fetchGithubData()
      if (data && data.skills.length > 0) {
        // Merge static and dynamic skills, avoiding duplicates by name
        const combined = [...staticSkills]
        data.skills.forEach(newSkill => {
          if (!combined.find(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
            combined.push(newSkill)
          }
        })
        setSkills(combined)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const expandedSkill = skills.find(s => s.id === expandedSkillId)

  // Randomized but stable positions for 2D nodes
  const nodePositions = useMemo(() => {
    return skills.map((_, i) => {
      // Create a distributed circle layout for better professionalism
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 35 // percent from center
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.8
      }
    })
  }, [skills])

  return (
    <div className="relative w-full min-h-[100dvh] bg-transparent overflow-hidden flex flex-col items-center justify-center py-20 px-4">
      
      {/* Background Neural Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {nodePositions.map((pos, i) => {
          const nextPos = nodePositions[(i + 1) % nodePositions.length]
          return (
            <line 
              key={i}
              x1={`${pos.x}%`} y1={`${pos.y}%`}
              x2={`${nextPos.x}%`} y2={`${nextPos.y}%`}
              stroke="#00f5ff"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )
        })}
        {/* Center connections */}
        {nodePositions.map((pos, i) => (
          <line 
            key={`center-${i}`}
            x1="50%" y1="50%"
            x2={`${pos.x}%`} y2={`${pos.y}%`}
            stroke="#9d4edd"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* Floating Particles (2D CSS) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30"
            animate={{
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center mb-16 md:mb-24">
        <motion.h2 
          className="font-display text-2xl md:text-4xl font-bold text-shadow-neon"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-neon-cyan">TECHNICAL</span>
          <span className="text-neon-purple ml-3">SKILLS</span>
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4" />
        <p className="font-mono text-[10px] md:text-xs text-cyber-border mt-2 uppercase tracking-widest">
          {loading ? '// Calculating proficiency from GitHub...' : '// Auto-analyzed from live code repositories'}
        </p>
      </div>

      <div className="relative w-full max-w-4xl aspect-square md:aspect-video mb-20">
        {/* Central Core */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-2 border-neon-purple rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 20px rgba(157, 78, 221, 0.2)',
              '0 0 40px rgba(157, 78, 221, 0.4)',
              '0 0 20px rgba(157, 78, 221, 0.2)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-center font-mono text-[10px] md:text-xs text-neon-purple group cursor-default">
            AI_CORE
            <br />
            v3.0
          </div>
        </motion.div>

        {/* Skill Nodes */}
        {skills.map((skill, index) => (
          <SkillNode 
            key={skill.id}
            skill={skill}
            x={nodePositions[index].x}
            y={nodePositions[index].y}
            index={index}
            isExpanded={expandedSkillId === skill.id}
            onClick={() => setExpandedSkillId(expandedSkillId === skill.id ? null : skill.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {expandedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm p-6 bg-cyber-surface/95 border border-neon-purple rounded-xl backdrop-blur-md shadow-neon-double"
              style={{ boxShadow: '0 0 30px rgba(157, 78, 221, 0.4)' }}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-display font-bold text-xl text-neon-purple">{expandedSkill.name}</h4>
                <button 
                  onClick={() => setExpandedSkillId(null)}
                  className="text-white hover:text-neon-cyan transition-colors text-xl p-2"
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
                    transition={{ duration: 1.5, ease: "easeOut" }} 
                  />
                </div>
              </div>
              
              <p className="font-mono text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-48 mb-6 pr-2">
                {expandedSkill.description}
              </p>
              
              <button 
                onClick={() => setExpandedSkillId(null)}
                className="w-full py-3 font-mono text-sm bg-neon-purple/20 border border-neon-purple/50 rounded hover:bg-neon-purple/30 transition-all duration-300 text-neon-purple-light uppercase tracking-widest"
              >
                [ CLOSE_LOGS ]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="mt-8 md:mt-0 font-mono text-[10px] md:text-xs text-neon-cyan/50 text-center pointer-events-none">
        <p className="animate-pulse">Click any system node to view data logs • Dynamic GitHub sync active</p>
      </div>
    </div>
  )
}