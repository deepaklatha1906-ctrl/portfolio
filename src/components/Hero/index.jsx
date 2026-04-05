import GlitchText from './GlitchText'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-auto">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Content - pointer-events-auto so text is selectable */}
      <div className="relative z-10 pointer-events-auto">
        <GlitchText name="Deepak A" title="AI & Data Science Student" />
      </div>
    </div>
  )
}