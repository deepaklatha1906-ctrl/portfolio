import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { fetchGithubData } from '../../utils/githubApi'

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [githubData, setGithubData] = useState(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Deepak's AI Assistant. Ask me about his projects, skills, or experience!" }
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function loadData() {
      const data = await fetchGithubData()
      if (data) setGithubData(data)
    }
    loadData()
  }, [])

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput('')
    
    setTimeout(() => {
      const topProjects = githubData?.projects.slice(0, 3).map(p => p.title).join(', ') || 'College Chatbot, Crime Analysis'
      const topSkills = githubData?.skills.slice(0, 4).map(s => s.name).join(', ') || 'Python, ML, SQL'

      const responses = {
        'projects': `Deepak has ${githubData?.projects.length || 5}+ active projects on GitHub. Some notable ones include ${topProjects}. Would you like details on any of these?`,
        'skills': `Deepak's top technical skills are ${topSkills}. His proficiency is automatically calculated based on his live GitHub contributions!`,
        'education': "B.Tech in AI & Data Science from Anna University. Focus on practical ML applications and data-driven solutions.",
        'contact': "You can reach Deepak at deepaklatha1906@gmail.com or via LinkedIn!",
        'default': "I can tell you about Deepak's live GitHub projects, his top skills, or his education. What would you like to know?"
      }
      
      const lowerInput = input.toLowerCase()
      let response = responses.default
      
      if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('repo')) {
        response = responses.projects
      } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('language')) {
        response = responses.skills
      } else if (lowerInput.includes('education') || lowerInput.includes('university') || lowerInput.includes('degree')) {
        response = responses.education
      } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('linkedin')) {
        response = responses.contact
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: response }])
    }, 1000)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-40 md:bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-neon-double"
        style={{ boxShadow: '0 0 20px #00f5ff, 0 0 40px #9d4edd' }}
      >
        <span className="text-2xl">🤖</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 md:bottom-24 right-6 z-40 w-80 md:w-96 bg-cyber-surface/95 border border-neon-cyan/30 rounded-xl backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
          >
            <div className="p-3 border-b border-neon-cyan/20 flex items-center justify-between bg-cyber-bg/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="font-mono font-bold text-neon-cyan">AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neon-cyan/70 hover:text-neon-cyan transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-neon-purple/20 border border-neon-purple/50 text-right' 
                      : 'bg-neon-cyan/10 border border-neon-cyan/30'
                  }`}>
                    <p className="font-mono text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg p-3">
                    <TypeAnimation
                      sequence={['Thinking', 300, 'Thinking.', 300, 'Thinking...', 300]}
                      wrapper="span"
                      speed={50}
                      className="font-mono text-sm text-neon-cyan"
                      repeat={Infinity}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-neon-cyan/20 bg-cyber-bg/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend() }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 bg-cyber-bg border border-neon-cyan/30 rounded px-3 py-2 font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/50 rounded font-mono text-sm text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}