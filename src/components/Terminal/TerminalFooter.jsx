import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Typewriter from './Typewriter'
import { careerObjective, contactInfo, detailedBio, philosophy, goal } from '../../utils/resumeData'

export default function TerminalFooter() {
  const outputEndRef = useRef(null)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState([])
  const [isAtBottom, setIsAtBottom] = useState(true)

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return
    const isBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 20
    setIsAtBottom(isBottom)
  }

  useEffect(() => {
    if (isInView && terminalOutput.length === 0) {
      setTerminalOutput([{ type: 'objective', text: careerObjective }])
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isInView, terminalOutput.length])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || !isAtBottom) return

    const scrollToEnd = () => {
      container.scrollTop = container.scrollHeight
    }

    const resizeObserver = new ResizeObserver(scrollToEnd)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [isAtBottom])

  const scrollToBottom = (force = false) => {
    if (force || isAtBottom) {
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleTerminalSubmit = (e, directCommand = null) => {
    if (e) e.preventDefault()
    const command = (directCommand || terminalInput).trim().toLowerCase()
    if (!command && !directCommand) return

    setTerminalOutput(prev => [...prev, { type: 'command', text: `$ ${directCommand || terminalInput}` }])
    setIsAtBottom(true) // Force auto-scroll for new commands
    
    setTimeout(() => {
      if (command === 'contact' || command === 'help contact') {
        const contactText = `📧 Email: ${contactInfo.email}\n🔗 LinkedIn: ${contactInfo.linkedin}\n💻 GitHub: ${contactInfo.github}\n📍 Location: ${contactInfo.location}`
        setTerminalOutput(prev => [...prev, { type: 'output', text: contactText }])
      } else if (command === 'help') {
        setTerminalOutput(prev => [...prev, { type: 'output', text: `Available commands:\n• about - Professional profile\n• philosophy - AI philosophy\n• goal - Career objectives\n• contact - Display contact info\n• projects - List featured projects\n• clear - Clear terminal` }])
      } else if (command === 'about') {
        setTerminalOutput(prev => [...prev, { type: 'output', text: detailedBio }])
      } else if (command === 'philosophy') {
        setTerminalOutput(prev => [...prev, { type: 'output', text: philosophy }])
      } else if (command === 'goal') {
        setTerminalOutput(prev => [...prev, { type: 'output', text: goal }])
      } else if (command === 'clear') {
        setTerminalOutput([])
      } else if (command === 'projects') {
        setTerminalOutput(prev => [...prev, { type: 'output', text: `Featured Projects:\n1. College Chatbot - AI NLP Telegram Bot\n2. Crime Data Analysis - Predictive Analytics\n3. Voice Assistant - Speech Recognition System` }])
      } else {
        setTerminalOutput(prev => [...prev, { type: 'error', text: `Command not found: '${command}'. Type 'help' for available commands.` }])
      }
      setTerminalInput('')
      setTimeout(scrollToBottom, 50)
    }, 200)
  }

  return (
    <footer ref={sectionRef} className="relative z-10 w-full mt-20 pb-10 font-mono">
      <div className="bg-cyber-bg/95 border-t border-neon-cyan/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto p-4 md:p-6 mb-2">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neon-cyan/20">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-neon-cyan/70">deepak@portfolio:</span>
          </div>
          <div ref={containerRef} onScroll={handleScroll} className="h-64 md:h-80 overflow-y-auto mb-4 space-y-3 text-sm scrollbar-thin scrollbar-thumb-neon-cyan/30">
            {terminalOutput.map((line, index) => (
              <div key={index} className={`${line.type === 'command' ? 'text-neon-cyan' : line.type === 'error' ? 'text-red-400' : line.type === 'objective' ? 'text-gray-300 italic' : 'text-gray-400'} whitespace-pre-wrap`}>
                {line.type === 'command' ? (
                   line.text
                ) : (
                  <Typewriter text={line.text} speed={50} onUpdate={scrollToBottom} onComplete={scrollToBottom} />
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
            <span className="text-neon-cyan">$</span>
            <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-gray-500"
              placeholder="Type 'contact' or 'help'..." />
            <motion.div className="w-2 h-4 bg-neon-cyan" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          </form>
          <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-neon-cyan/10">
            {['contact', 'about', 'philosophy', 'goal', 'projects', 'help'].map((cmd) => (
              <button key={cmd} onClick={() => handleTerminalSubmit(null, cmd)}
                className="px-3 py-1 text-xs bg-neon-cyan/10 border border-neon-cyan/30 rounded hover:bg-neon-cyan/20 transition-colors text-neon-cyan uppercase font-bold tracking-tighter">
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}