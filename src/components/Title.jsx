import React from 'react'
import { motion } from 'motion/react'

const Title = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center px-2 sm:px-4 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-full sm:max-w-lg md:max-w-xl text-center text-sm sm:text-base
          text-gray-500 dark:text-white/75 mb-4 sm:mb-6 mt-2 sm:mt-3"
      >
        {desc}
      </motion.p>
    </div>
  )
}

export default Title
