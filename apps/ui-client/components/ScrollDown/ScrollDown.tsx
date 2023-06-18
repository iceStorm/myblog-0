'use client'

import { motion } from 'framer-motion'

import { BsChevronDown } from 'react-icons/bs'

export function ScrollDown() {
  return (
    <motion.div
      role="button"
      animate={{ y: [null, -20, 0] }}
      transition={{ repeat: Infinity, ease: 'easeInOut', duration: 2 }}
      onClick={() => {
        document.getElementById('app-main')?.scrollIntoView({
          behavior: 'smooth'
        })
      }}
    >
      <BsChevronDown size={30} className="text-white text-opacity-25 mx-auto" />
    </motion.div>
  )
}
