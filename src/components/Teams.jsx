import React from 'react'
import Title from './Title'
import { teamData } from '../assets/assets'
import { motion } from 'motion/react'

const Teams = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 sm:gap-7
        px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40
        pt-16 sm:pt-20 md:pt-24 lg:pt-30
        text-gray-800 dark:text-white w-full"
    >
      <Title
        title="Meet our team"
        desc="We are a team of creative thinkers, designers, and developers who are passionate about creating digital products that make a difference."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full max-w-6xl">
        {teamData.map((team, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="flex flex-row sm:flex-col md:flex-row items-center gap-4 sm:gap-3 md:gap-4
              p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700
              bg-white dark:bg-gray-900 shadow-xl shadow-gray-100 dark:shadow-white/5
              transition-all duration-300"
          >
            <img
              src={team.image}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 object-cover"
              alt={team.name}
            />
            <div className="flex-1 min-w-0 text-left sm:text-center md:text-left">
              <h3 className="font-bold text-sm sm:text-base truncate">{team.name}</h3>
              <p className="text-xs sm:text-sm opacity-60 truncate">{team.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Teams
