import { useEffect, useState } from 'react'

export default function Typewriter({ text, speed = 50, className = '', onComplete, onUpdate }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
        if (onUpdate) onUpdate()
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete, onUpdate])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">▊</span>
    </span>
  )
}