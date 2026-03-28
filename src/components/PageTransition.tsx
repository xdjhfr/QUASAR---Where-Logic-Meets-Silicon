import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial: { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.98,
    transition: { duration: 0.22, ease: 'easeIn' }
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'opacity, filter, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
