import Image from 'next/image'

import clsx from 'clsx'

import { CgMenuRight } from 'react-icons/cg'

import './global.scss'

import { ScrollDown } from '../components/ScrollDown'
import { BackgroundAudio } from '../components/BackgroundAudio'
import { MusicNote } from '../components/MusicNote'
import { HeaderScrollDetector } from '../components/HeaderScrollDetector'

export const metadata = {
  title: 'dreamee',
  description: 'Welcome to my fantastic island.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-dark">
        <HeaderScrollDetector />

        {/* navigation bar */}
        <header id="app-header" className={clsx('fixed z-50 left-0 right-0 top-0')}>
          <nav className={clsx('container flex justify-between gap-5 items-center py-5', '')}>
            <a role="button" href="/" className={clsx('text-white font-highlight')}>
              dreamee.vn
            </a>

            <button
              className={clsx(
                'lg:hidden flex justify-center items-center p-2',
                'text-white bg-white bg-opacity-20 rounded-full shadow-md'
              )}
            >
              <CgMenuRight className="" size={20} />
            </button>

            <ul className={clsx('text-white flex items-center gap-2 lg:gap-5', 'hidden lg:flex')}>
              <li>
                <a
                  href="/"
                  className="flex px-5 py-1 font-medium bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-md"
                >
                  Home
                </a>
              </li>

              <li>
                <a href="/" className="flex px-5 py-1 font-medium">
                  Gallery
                </a>
              </li>

              <li>
                <a href="/" className="flex px-5 py-1 font-medium">
                  Programming
                </a>
              </li>

              <li>
                <a href="/" className="flex px-5 py-1 font-medium">
                  About
                </a>
              </li>

              <li>
                <a href="/" className="flex px-5 py-1 font-medium">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* lobby background image */}
        <section id="lobby" className={clsx('relative bg-red')}>
          <BackgroundAudio />
          <MusicNote />

          <Image
            src="/home-banner.jpg"
            alt="home_banner"
            priority
            width={0}
            height={0}
            sizes="100vw"
            fill
            className="transition-all duration-500 w-full h-full object-cover"
          />

          {/* scroll more button */}
          <button
            role="button"
            className="absolute bottom-0 left-0 right-0 container text-center mb-5"
          >
            <ScrollDown />
          </button>
        </section>

        <main id="app-main" className={clsx('flex-1', 'text-white')}>
          {children}
        </main>

        {/* <footer id="app-footer" className="border-t py-3 bg-white">
          <div className="container">
            Coded with <span className="text-blue-500">&hearts;</span> using NextJS, TailwindCSS.
          </div>
        </footer> */}
      </body>
    </html>
  )
}
