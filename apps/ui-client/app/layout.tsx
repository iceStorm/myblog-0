import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Script from 'next/script'

import clsx from 'clsx'

import './global.scss'

import { apiClient } from '../utils/api-client'

import { ScrollDown } from '../components/ScrollDown'
import { HeaderScrollDetector } from '../components/HeaderScrollDetector'
import { MusicPlayer } from '../components/MusicPlayer'
import { SideMenu } from '../components/SideMenu'

export const metadata = {
  title: 'dreamee',
  description: 'Welcome to my fantastic island.'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  let playlist: SpotifyApi.PlaylistBaseObject | undefined = undefined

  try {
    const { data } = await apiClient.get<SpotifyApi.PlaylistBaseObject>('/api/spotify')
    playlist = data

    console.log(playlist.tracks.items[0].track)
  } catch (error) {
    console.log(error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://sdk.scdn.co/spotify-player.js"></Script>
      </head>

      <body className="flex flex-col bg-dark">
        <HeaderScrollDetector threshold={200} />

        {/* navigation bar */}
        <header id="app-header" className={clsx('fixed z-50 left-0 right-0 top-0')}>
          <nav className={clsx('container flex justify-between gap-5 items-center py-5', '')}>
            <a role="link" href="/" className={clsx('text-white font-highlight')}>
              dreamee.vn
            </a>

            <SideMenu />
          </nav>
        </header>

        {/* lobby */}
        <section id="lobby" className={clsx('h-screen relative bg-red')}>
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

          {playlist && <MusicPlayer playlist={playlist} />}

          {/* scroll more button */}
          <button
            role="button"
            aria-label="Scroll down to view more"
            className="absolute bottom-0 left-0 right-0 container text-center mb-5"
          >
            <ScrollDown />
          </button>
        </section>

        <main id="app-main" className={clsx('flex-1', 'text-gray-400')}>
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
