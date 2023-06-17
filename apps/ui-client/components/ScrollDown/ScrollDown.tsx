'use client'

import { motion } from 'framer-motion'

import { BsChevronDown } from 'react-icons/bs'

export function ScrollDown() {
  return (
    <motion.a
      animate={{ y: [null, -20, 0] }}
      transition={{ repeat: Infinity, ease: 'easeInOut', duration: 2 }}
      onClick={() => {
        window.scrollTo({
          behavior: 'smooth',
          top: document.getElementById('app-main')?.scrollTop
        })
      }}
    >
      <BsChevronDown size={30} className="text-white text-opacity-75 mx-auto" />
    </motion.a>
  )
}
