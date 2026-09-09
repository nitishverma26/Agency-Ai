import React, { useRef, useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'
import toast from 'react-hot-toast'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

const fieldVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const AnimatedInput = ({ children, index, className = '' }) => (
  <motion.div
    custom={index}
    variants={fieldVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    style={{ transformStyle: 'preserve-3d' }}
    className={`group ${className}`}
  >
    {children}
  </motion.div>
)

const ContactUs = () => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  )

  const handleMouseMove = (e) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitStatus(null)
    setIsSubmitting(true)

    const formData = new FormData(event.target)

    formData.append(
      'access_key',
      '851aeeef-b9ab-42ea-a947-a4a9d74ccb7c'
    )

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        toast.success('Form submitted successfully!')
        event.target.reset()
        setTimeout(() => setSubmitStatus(null), 6000)
      } else {
        setSubmitStatus('error')
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="contact-us"
      className="flex flex-col items-center gap-6 sm:gap-7
        px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40
        pt-16 sm:pt-20 md:pt-24 lg:pt-30 pb-8
        text-gray-700 dark:text-white w-full"
    >
      <Title
        title="Reach out to us"
        desc="From strategy to execution, we craft digital solutions that move your business forward"
      />

      <div
        className="relative w-full max-w-2xl"
        style={{ perspective: '1200px' }}
      >
        {/* Ambient glow orbs */}
        <motion.div
          className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 60, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full p-4 sm:p-6 md:p-8 rounded-2xl
            bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl
            border border-white/20 dark:border-gray-700/50
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
            dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="sm:col-span-2 flex items-start gap-3 p-4 rounded-xl
                  bg-green-50 dark:bg-green-950/40
                  border border-green-200 dark:border-green-800
                  text-green-800 dark:text-green-300"
              >
                <span className="text-xl shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Form submitted successfully!
                  </p>
                  <p className="text-xs sm:text-sm mt-1 opacity-80">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="ml-auto text-green-600 dark:text-green-400 text-lg leading-none"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="sm:col-span-2 flex items-start gap-3 p-4 rounded-xl
                  bg-red-50 dark:bg-red-950/40
                  border border-red-200 dark:border-red-800
                  text-red-800 dark:text-red-300"
              >
                <span className="text-xl shrink-0">!</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Submission failed
                  </p>
                  <p className="text-xs sm:text-sm mt-1 opacity-80">
                    Please try again or check your internet connection.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="ml-auto text-red-600 dark:text-red-400 text-lg leading-none"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Name */}
          <AnimatedInput index={0}>
            <p className="mb-2 text-sm font-medium">Your name</p>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-2 border border-gray-300/80 dark:border-gray-600/80
                rounded-xl px-3 bg-white/50 dark:bg-gray-800/50
                transition-shadow duration-300
                focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                focus-within:shadow-blue-500/20"
            >
              <motion.img
                src={assets.person_icon}
                alt=""
                className="w-5 opacity-60"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.4 }}
              />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 text-sm outline-none bg-transparent"
                required
              />
            </motion.div>
          </AnimatedInput>

          {/* Email */}
          <AnimatedInput index={1}>
            <p className="mb-2 text-sm font-medium">Email id</p>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-2 border border-gray-300/80 dark:border-gray-600/80
                rounded-xl px-3 bg-white/50 dark:bg-gray-800/50
                transition-shadow duration-300
                focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                focus-within:shadow-blue-500/20"
            >
              <motion.img
                src={assets.person_icon}
                alt=""
                className="w-5 opacity-60"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.4 }}
              />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 text-sm outline-none bg-transparent"
                required
              />
            </motion.div>
          </AnimatedInput>

          {/* Message */}
          <AnimatedInput index={2} className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium">Message</p>
              <motion.textarea
                name="message"
                rows={5}
                placeholder="Enter your message"
                whileHover={{ scale: 1.005 }}
                whileFocus={{ scale: 1.01 }}
                className="w-full p-3 text-sm outline-none rounded-xl min-h-[120px] sm:min-h-[160px]
                  border border-gray-300/80 dark:border-gray-600/80
                  bg-white/50 dark:bg-gray-800/50 resize-none
                  transition-shadow duration-300
                  focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                  focus:shadow-blue-500/20"
                required
              />
          </AnimatedInput>

          {/* Submit button */}
          <motion.div
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="sm:col-span-2 flex justify-center sm:justify-start"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : {
                scale: 1.05,
                rotateX: -5,
                boxShadow: '0 20px 40px rgba(29, 78, 216, 0.4)',
              }}
              whileTap={isSubmitting ? {} : { scale: 0.95, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-full sm:w-max flex gap-2 items-center justify-center
                bg-gradient-to-r from-blue-600 to-blue-700
                text-white text-sm px-10 py-3 rounded-full cursor-pointer
                shadow-lg shadow-blue-600/30
                disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                whileHover={{ x: -2 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.span>
              {!isSubmitting && (
                <motion.img
                  src={assets.arrow_icon}
                  alt=""
                  className="w-4"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default ContactUs
