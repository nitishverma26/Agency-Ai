import React, { useRef } from 'react'
import assets from '../assets/assets'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 30, rotateX: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#our-work', label: 'Our Work' },
  { href: '#contact-us', label: 'Contact Us' },
]

const socials = [
  { icon: assets.facebook_icon, alt: 'Facebook' },
  { icon: assets.twitter_icon, alt: 'Twitter' },
  { icon: assets.instagram_icon, alt: 'Instagram' },
  { icon: assets.linkedin_icon, alt: 'LinkedIn' },
]

const Footer = ({ theme }) => {
  const newsletterRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    springConfig
  )

  const handleMouseMove = (e) => {
    if (!newsletterRef.current) return
    const rect = newsletterRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <footer className="relative mt-12 sm:mt-16 md:mt-20
      px-4 sm:px-8 md:px-10 lg:px-24 xl:px-40
      pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden
      bg-slate-50 dark:bg-gray-900 text-gray-700 dark:text-gray-400 w-full">

      {/* Ambient glow */}
      <motion.div
        className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.15, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col md:flex-row justify-between md:items-start gap-10 md:gap-12">

        {/* Logo & Description */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
          className="space-y-4 sm:space-y-5 text-sm text-center md:text-left"
        >
          <motion.img
            src={theme === 'dark' ? assets.logo_dark : assets.logo}
            className="w-32 sm:w-44"
            alt="Agency AI logo"
            whileHover={{ scale: 1.03, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          <p className="max-w-md leading-relaxed">
            From strategy to execution, we craft digital
            solutions that move your business forward.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
          className="text-center md:text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Quick Links
          </h3>

          <ul className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={link.href}
                  className="relative inline-block hover:text-blue-600 dark:hover:text-blue-400
                    transition-colors duration-300"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        ref={newsletterRef}
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 rounded-2xl
          bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl
          border border-white/20 dark:border-gray-700/50
          shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]
          dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)]"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Subscribe to our newsletter
        </h3>
        <p className="text-sm mt-2 mb-6">
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 text-sm">
          <motion.input
            type="email"
            placeholder="Enter your email"
            whileFocus={{ scale: 1.01 }}
            className="w-full p-3 text-sm outline-none rounded-xl
              dark:text-gray-200 bg-white/50 dark:bg-gray-900/50
              border border-gray-300/80 dark:border-gray-600/80
              transition-shadow duration-300
              focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          />
          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
              rotateX: -4,
              boxShadow: '0 12px 30px rgba(29, 78, 216, 0.35)',
            }}
            whileTap={{ scale: 0.95, rotateX: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white
              rounded-xl px-8 py-3 font-medium whitespace-nowrap
              shadow-lg shadow-blue-600/25"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>

      <motion.hr
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="border-gray-300 dark:border-gray-600 my-8 origin-left"
      />

      {/* Footer bottom */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
      >
        <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
          Copyright 2026 @ agency.AI — All Rights Reserved
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social, i) => (
            <motion.a
              key={social.alt}
              href="#"
              aria-label={social.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                rotateY: 180,
                y: -4,
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50
                border border-gray-200/60 dark:border-gray-700/60
                hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                transition-colors duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src={social.icon} alt={social.alt} className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
