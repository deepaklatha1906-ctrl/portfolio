import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import HolographicPanel from './HolographicPanel'
import { projectsData } from '../../utils/resumeData'

export default function DigitalOffice() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan">PROJECTS</span>
            <span className="text-neon-purple">_HUB</span>
          </h2>
          <p className="font-mono text-cyber-border">// Interactive holographic interface displaying my work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0, transition: { delay: index * 0.15, duration: 0.5 } } : {}}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px #00f5ff, 0 0 60px #9d4edd' }}
              className="relative"
            >
              <HolographicPanel project={project} index={index} />
            </motion.div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  )
}