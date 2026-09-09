import React from 'react'
import assets from '../assets/assets'
import Title from './Title.jsx'
import { motion } from 'motion/react'

const Services = () => {
  const servicesData = [
    {
      title: 'App Development',
      description:
        'From concept to launch, I create mobile apps that are fast, user-friendly, and packed with real-world features. Whether it’s Android or iOS, I deliver apps with smooth functionality, modern UI/UX, and seamless integration',
      icon: assets.ads_icon,
    },
    {
      title: 'Web Development',
      description:
        'I build responsive, SEO-friendly websites that showcase brands and engage users. From sleek landing pages to dynamic e-commerce platforms, my web solutions combine design, speed, and security to help businesses grow online.',
      icon: assets.marketing_icon,
    },
    {
      title: 'Content Writing',
      description:
        'We help you create marketing strategies that drive results.',
      icon: assets.content_icon,
    },
    {
      title: 'Software Engineer',
      description:
        'I am a software engineer who designs scalable, efficient, and secure solutions, blending creativity with problem-solving to deliver reliable applications for real-world challenges.',
      icon: assets.social_icon,
    },
  ]

  return (
    <div
      id="services"
      className="relative flex flex-col items-center gap-6 sm:gap-7
        px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40
        pt-16 sm:pt-20 md:pt-24 lg:pt-30
        text-gray-700 dark:text-white overflow-hidden w-full"
    >
      <img
        src={assets.bgImage2}
        alt=""
        className="hidden md:block absolute -top-60 lg:-top-110 -left-40 lg:-left-70
          -z-1 max-w-lg lg:max-w-none dark:hidden pointer-events-none"
      />

      <Title
        title="How can we help?"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mt-6 sm:mt-10">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex flex-col gap-3 sm:gap-4 p-5 sm:p-6 rounded-xl
              border border-gray-200 dark:border-white/10
              bg-white/50 dark:bg-gray-900/50
              hover:shadow-lg hover:shadow-blue-500/10 transition-shadow"
          >
            <img
              src={service.icon}
              alt={service.title}
              className="w-10 h-10"
            />

            <h3 className="text-base sm:text-lg font-semibold">
              {service.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services
