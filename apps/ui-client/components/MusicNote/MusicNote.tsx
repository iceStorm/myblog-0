'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { IoMusicalNoteOutline } from 'react-icons/io5'

export function MusicNote() {
  return (
    <motion.button
      role="button"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className={clsx(
        'absolute bottom-10 right-10 z-50',
        'flex justify-center items-center p-2',
        'text-white bg-white bg-opacity-20 rounded-full shadow-md'
      )}
    >
      <IoMusicalNoteOutline />
    </motion.button>
  )
}
