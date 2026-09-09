import React, { useState, useEffect } from 'react'
import assets from '../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#our-work', label: 'Our Work' },
  { href: '#contact-us', label: 'Contact Us' },
]

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 py-3 sm:py-4
          sticky top-0 z-50 backdrop-blur-xl font-medium bg-white/90 dark:bg-black/90
          border-b border-gray-100 dark:border-gray-800"
      >
        <a href="#hero">
          <img
            src={theme === 'dark' ? assets.logo_dark : assets.logo}
            className="w-28 sm:w-32 md:w-40"
            alt="Agency AI"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-4 md:gap-6 text-sm md:text-base text-gray-700 dark:text-white">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-primary dark:hover:text-blue-400 transition-colors
                  border-b-2 border-transparent hover:border-primary pb-0.5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden p-1"
          >
            <img
              src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
              alt=""
              className="w-7 h-7"
            />
          </button>

          <a
            href="#contact-us"
            className="hidden sm:flex text-sm items-center gap-2 bg-primary text-white
              px-4 md:px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Connect
            <img src={assets.arrow_icon} width={14} alt="" />
          </a>
        </div>
      </motion.nav>

      {/* Mobile sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 w-[min(100vw,280px)] z-50 sm:hidden
          flex flex-col gap-6 pt-20 px-8
          bg-primary text-white shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 p-1"
        >
          <img src={assets.close_icon} alt="" className="w-5 invert" />
        </button>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setSidebarOpen(false)}
            className="text-lg font-medium hover:opacity-80 transition-opacity"
          >
            {link.label}
          </a>
        ))}

        <a
          href="#contact-us"
          onClick={() => setSidebarOpen(false)}
          className="mt-4 flex items-center justify-center gap-2 bg-white text-primary
            px-6 py-3 rounded-full font-medium"
        >
          Connect
          <img src={assets.arrow_icon} width={14} alt="" />
        </a>
      </motion.div>
    </>
  )
}

export default Navbar
