import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const transition = { duration: 0.42, ease: 'easeOut' as const }
const exitTransition = { duration: 0.22, ease: 'easeIn' as const }

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, transition }}
        exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98, transition: exitTransition }}
        style={{ willChange: 'opacity, filter, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
