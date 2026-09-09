import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import assets from './assets/assets'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  )

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1
      position.current.y += (mouse.current.y - position.current.y) * 0.1

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0) scale(${scaleRef.current})`
      }

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Magnetic effect
  useEffect(() => {
    const interactiveElements = document.querySelectorAll('button, a, input')

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // pull cursor toward element center
        position.current.x = centerX
        position.current.y = centerY
        scaleRef.current = 1.5
        if (outlineRef.current) outlineRef.current.style.borderColor = '#ff5722'
      })

      el.addEventListener('mouseleave', () => {
        scaleRef.current = 1
        if (outlineRef.current) outlineRef.current.style.borderColor = ''
      })
    })

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', () => {})
        el.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  // Click effect
  useEffect(() => {
    const handleClick = () => {
      scaleRef.current = 0.8
      setTimeout(() => {
        scaleRef.current = 1
      }, 150)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Dark mode toggle
  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 relative overflow-x-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 10000,
            fontSize: '14px',
            maxWidth: '90vw',
          },
          success: {
            style: {
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #6ee7b7',
            },
            iconTheme: {
              primary: '#059669',
              secondary: '#ecfdf5',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fca5a5',
            },
          },
        }}
      />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

      {/* Custom cursor ring — desktop only */}
      <div
        ref={outlineRef}
        className="custom-cursor fixed top-0 left-0 h-10 w-10 rounded-full border border-primary dark:border-white pointer-events-none z-[9999] transition-transform duration-200 ease-out"
      ></div>

      {/* Custom cursor dot — desktop only */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 h-3 w-3 rounded-full bg-primary dark:bg-white pointer-events-none z-[9999]"
      ></div>
    </div>
  )
}

export default App
