import { motion } from 'framer-motion'
import { contactInfo } from '../../utils/resumeData'

export default function GlitchText({ name, title }) {
  return (
    <div className="relative ml-4 md:ml-16">
      <motion.h1 
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold relative"
        animate={{ 
          textShadow: [
            '0 0 10px #00f5ff, 0 0 20px #00f5ff',
            '2px 0 #ff00aa, -2px 0 #00f5ff',
            '-2px 0 #ff00aa, 2px 0 #00f5ff',
            '0 0 10px #00f5ff, 0 0 20px #00f5ff'
          ]
        }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
      >
        <span className="relative text-neon-cyan z-10">{name}</span>
        <span className="absolute top-0 left-0 text-neon-pink opacity-70 animate-glitch select-none pointer-events-none" aria-hidden="true">{name}</span>
        <span className="absolute top-0 left-0 text-neon-purple opacity-70 animate-glitch animation-delay-100 select-none pointer-events-none" aria-hidden="true">{name}</span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-4"
      >
        <p className="font-mono text-neon-cyan/80 text-lg md:text-xl">
          {'>'} <span className="text-white">{title}</span>
        </p>
        
        {/* Download Resume Button */}
        <motion.div 
            className="mt-6 flex items-center gap-4 group cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ x: 10 }}
        >
            <a 
                href="/portfolio/Deepak_A_Resume.png" 
                download="Deepak_A_Resume.png"
                className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/50 hover:bg-neon-cyan/20 rounded-sm transition-all duration-300"
            >
                <div className="w-2 h-2 bg-neon-cyan group-hover:animate-ping" />
                <span className="font-mono text-sm tracking-widest text-neon-cyan">DOWNLOAD_RESUME.exe</span>
                {/* Download Icon (Arrow Down) */}
                <svg 
                    className="w-4 h-4 text-neon-cyan group-hover:translate-y-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
            className="mt-6 flex flex-wrap items-center gap-3 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
        >
            <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 md:p-3 bg-neon-cyan/5 border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan text-neon-cyan/60 hover:text-neon-cyan transition-all duration-300 group"
                title="Email (Gmail)"
            >
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            </a>
            <a 
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 md:p-3 bg-neon-cyan/5 border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan text-neon-cyan/60 hover:text-neon-cyan transition-all duration-300 group"
                title="LinkedIn"
            >
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.1 0-2.1.6-2.6 1.5v-1.3H10v7.8h3V13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5h3M6.2 9a1.7 1.7 0 0 0 1.7-1.7c0-.9-.8-1.7-1.7-1.7-1 .1-1.7.8-1.7 1.7 0 .9.8 1.7 1.7 1.7M5 18.5h3v-7.8H5v7.8z" />
                </svg>
            </a>
            <a 
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 md:p-3 bg-neon-cyan/5 border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan text-neon-cyan/60 hover:text-neon-cyan transition-all duration-300 group"
                title="GitHub"
            >
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
                </svg>
            </a>
        </motion.div>

        <motion.div 
          className="w-3 h-5 bg-neon-cyan mt-6 animate-pulse"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="absolute -right-20 top-10 hidden lg:block">
        <div className="font-mono text-xs text-neon-purple/50 space-y-1">
          {['01001000', '10101100', '11001010', '00110101'].map((binary, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: [0, 1, 0], x: [20, 0, -20] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, repeatDelay: 1 }}
            >
              {binary}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}