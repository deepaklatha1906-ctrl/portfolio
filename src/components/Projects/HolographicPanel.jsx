import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function HolographicPanel({ project }) {
  const chartData = project.visualizationData || [
    { name: 'Jan', value: 40 }, { name: 'Feb', value: 65 },
    { name: 'Mar', value: 45 }, { name: 'Apr', value: 80 },
  ]

  return (
    <motion.div className="relative bg-cyber-surface/80 border border-neon-cyan/30 rounded-xl overflow-hidden backdrop-blur-sm"
      style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)' }}>
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent)', boxShadow: 'inset 0 0 30px rgba(0, 245, 255, 0.3)' }} />
      
      <div className="p-4 border-b border-neon-cyan/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
          <h3 className="font-mono font-bold text-neon-cyan">{project.title}</h3>
        </div>
        <span className="font-mono text-xs text-neon-purple/70">v{project.version}</span>
      </div>
      
      <div className="p-4 space-y-4">
        <p className="font-mono text-sm text-gray-300 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2 py-1 text-xs font-mono bg-neon-cyan/10 border border-neon-cyan/30 rounded text-neon-cyan">{tech}</span>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          {project.github && (
            <motion.a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-3 font-mono text-xs bg-neon-purple/20 border border-neon-purple/50 rounded hover:bg-neon-purple/30 transition-colors text-center"
            >
              [GITHUB]
            </motion.a>
          )}
          {project.live && (
            <motion.a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-3 font-mono text-xs bg-neon-cyan/20 border border-neon-cyan/50 rounded hover:bg-neon-cyan/30 transition-colors text-center"
            >
              [LIVE_DEMO]
            </motion.a>
          )}
        </div>
      </div>
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/50" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-neon-purple/50" />
    </motion.div>
  )
}