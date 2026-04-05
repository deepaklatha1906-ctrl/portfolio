import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import DigitalOffice from './components/Projects/DigitalOffice'
import ParticleHub from './components/Skills/ParticleHub'
import TerminalFooter from './components/Terminal/TerminalFooter'
import FloatingAssistant from './components/AIAssistant/FloatingAssistant'
import { useEffect, useRef, Suspense } from 'react'
import { Loader } from '@react-three/drei'
import CyberBrain from './components/Hero/CyberBrain'
import GlitchText from './components/Hero/GlitchText'

// ✅ CyberBrain component NOW inside Canvas
function CyberBrainWrapper() {
  return (
    <Suspense fallback={null}>
      <Hero3DElements />
    </Suspense>
  )
}

function Hero3DElements() {
  // This component uses R3F hooks - safe because it's inside Canvas
  return <CyberBrain />
}

function App() {
  const containerRef = useRef()
  const { scrollYProgress } = useScroll()
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const officeOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
  const skillsOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1])

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0a0a12 0%, #121220 50%, #0a0a12 100%)'
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen">
      
      {/* ✅ 3D Canvas Layer - NOW includes CyberBrain */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
          
          {/* ✅ CyberBrain rendered INSIDE Canvas */}
          <CyberBrainWrapper />
          
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.5} intensity={1.5} mipmapBlur />
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
        </Canvas>
        {/* Loading spinner for 3D models */}
        <Loader />
      </div>

      {/* ✅ UI Content Layers (no R3F hooks here) */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        {/* Hero now only has 2D UI - no 3D component */}
        <Hero2D />
      </motion.section>

      <motion.section 
        style={{ opacity: officeOpacity }}
        className="relative z-10 min-h-screen py-20"
      >
        <DigitalOffice />
      </motion.section>

      <motion.section 
        style={{ opacity: skillsOpacity }}
        className="relative z-10 min-h-screen py-20 mb-20"
      >
        <ParticleHub />
      </motion.section>

      <FloatingAssistant />
      <TerminalFooter />
    </div>
  )
}

// ✅ Hero split: 2D UI only (no R3F hooks)
function Hero2D() {
  
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 px-4">
      <GlitchText name="Deepak A" title="AI & Data Science Student" />
      
      {/* Scroll indicator - Repositioned to be below the resume button */}
      <motion.div 
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 md:-bottom-48"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-cyan/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </div>
  )
}

export default App