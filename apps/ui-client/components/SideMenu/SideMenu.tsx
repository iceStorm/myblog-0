'use client'

import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { CgMenuRight } from 'react-icons/cg'
import { AnimatePresence, motion } from 'framer-motion'

export function SideMenu() {
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isSideMenuOpened ? 'hidden' : 'auto'
  }, [isSideMenuOpened])

  return (
    <>
      {/* desktop header menu */}
      <AnimatePresence>
        {!isSideMenuOpened && (
          <ul
            className={clsx('text-white flex items-center gap-2 lg:gap-5', 'lg:flex', {
              hidden: !isSideMenuOpened,
              flex: isSideMenuOpened,
              'absolute right-0 top-10 bg-white bg-opacity-20 backdrop-blur-md flex flex-col rounded-md shadow-md text-left':
                isSideMenuOpened
            })}
          >
            <li className="w-full">
              <a
                href="/"
                role="link"
                className={clsx(
                  'flex px-5 py-1 font-medium bg-white bg-opacity-20 backdrop-blur-md',
                  {
                    'rounded-full shadow-md': !isSideMenuOpened,
                    'hover:bg-transparent flex': isSideMenuOpened
                  }
                )}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/"
                className="flex px-5 py-1 font-medium text-white hover:text-opacity-75"
                role="link"
              >
                Gallery
              </a>
            </li>

            <li>
              <a
                href="/"
                className="flex px-5 py-1 font-medium text-white hover:text-opacity-75"
                role="link"
              >
                Programming
              </a>
            </li>

            <li>
              <a
                href="/"
                className="flex px-5 py-1 font-medium text-white hover:text-opacity-75"
                role="link"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/"
                className="flex px-5 py-1 font-medium text-white hover:text-opacity-75"
                role="link"
              >
                Contact
              </a>
            </li>
          </ul>
        )}
      </AnimatePresence>

      {/* side menu hamburger button */}
      <button
        role="button"
        aria-label="Toggle side menu"
        className={clsx(
          'lg:hidden flex justify-center items-center p-2',
          'text-white bg-white bg-opacity-20 rounded-full shadow-md'
        )}
        onClick={() => setIsSideMenuOpened(!isSideMenuOpened)}
      >
        <CgMenuRight className="" size={20} />
      </button>

      {/* mobile side menu */}
      <AnimatePresence>
        {isSideMenuOpened && (
          <motion.aside
            className={clsx(
              'fixed z-50 top-16 right-0 bottom-0 left-0',
              'bg-black bg-opacity-30 backdrop-blur-md'
            )}
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
          >
            <div className="container py-5 text-white">TYL.</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
