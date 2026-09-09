import React, { useRef, useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

const WorkCard = ({ work, index }) => {
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 22, mass: 0.4 }
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    springConfig
  )

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setSpotlight((s) => ({ ...s, visible: false }))
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative cursor-pointer group"
    >
      {/* Cursor spotlight */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl z-0 transition-opacity duration-500
          ${spotlight.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="absolute w-64 h-64 rounded-full blur-3xl
            bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40"
          style={{
            left: spotlight.x - 128,
            top: spotlight.y - 128,
          }}
        />
      </div>

      <motion.div
        whileHover={{ z: 30 }}
        className="relative z-10 rounded-2xl overflow-hidden
          bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm
          border border-gray-200/60 dark:border-gray-700/60
          shadow-lg shadow-gray-200/50 dark:shadow-black/30
          group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)]
          group-hover:border-blue-400/30
          transition-[box-shadow,border-color] duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="overflow-hidden rounded-t-2xl">
          <motion.img
            src={work.image}
            alt={work.title}
            className="w-full aspect-[4/3] object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="p-5">
          <motion.h3
            className="text-lg font-semibold mb-2"
            whileHover={{ x: 4, color: '#2563eb' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {work.title}
          </motion.h3>

          <motion.p
            className="text-sm opacity-60 leading-relaxed"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
          >
            {work.description}
          </motion.p>

          <motion.span
            className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -8 }}
            whileHover={{ x: 0 }}
          >
            View project
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

const OurWork = () => {
  const workData = [
    {
      title: 'Web Developer',
      description:
        'I create responsive, secure websites that combine speed, design, and business growth',
      image: assets.work_mobile_app,
    },
    {
      title: 'Software Developer',
      description:
        'I design scalable, efficient software solutions with clean code and reliable performance.',
      image: assets.work_dashboard_management,
    },
    {
      title: 'Mobile App Developer',
      description:
        'I build user-friendly mobile apps with modern design.',
      image: assets.work_fitness_app,
    },
  ]

  return (
    <div
      id="our-work"
      className="flex flex-col items-center gap-6 sm:gap-7
        px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40
        pt-16 sm:pt-20 md:pt-24 lg:pt-30
        text-gray-700 dark:text-white w-full"
      style={{ perspective: '1200px' }}
    >
      <Title
        title="Our latest work"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-5xl">
        {workData.map((work, index) => (
          <WorkCard key={work.title} work={work} index={index} />
        ))}
      </div>
    </div>
  )
}

export default OurWork
