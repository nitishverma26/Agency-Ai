import React from 'react'
import assets from '../assets/assets'
import { motion } from 'motion/react'

function Hero() {
  return (
    <div
      id="hero"
      className="flex flex-col items-center gap-5 sm:gap-6
        py-12 sm:py-16 md:py-20
        px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40
        text-center w-full overflow-hidden
        text-gray-700 dark:text-white bg-white dark:bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 border border-gray-300
          p-1.5 pr-3 sm:pr-4 rounded-full"
      >
        <img src={assets.group_profile} alt="Group profile" className="w-8 sm:w-auto" />
        <p className="text-xs sm:text-sm font-medium">Trusted by 10k+ people</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[84px]
          font-medium xl:leading-[95px] max-w-5xl px-2"
      >
        Turning imagination into{' '}
        <span className="text-blue-600">Digital </span>impact
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-base md:text-lg font-medium text-gray-500
          dark:text-white/75 max-w-[90%] sm:max-w-lg md:max-w-2xl pb-3 px-2"
      >
        Creating meaningful connections and turning big ideas into interactive digital
        experiences. We are a team of creative thinkers, designers, and developers who
        are passionate about creating digital products that make a difference.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        viewport={{ once: true }}
        className="relative w-full max-w-6xl px-2 sm:px-0"
      >
        <img
          src={assets.hero_img}
          alt="Hero showcase"
          className="w-full rounded-lg sm:rounded-none"
        />
        <img
          src={assets.bgImage1}
          alt=""
          className="hidden lg:block absolute -top-20 -right-20 xl:-top-40 xl:-right-40
            -z-1 max-w-md dark:hidden pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

export default Hero
