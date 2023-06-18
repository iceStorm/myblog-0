'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import clsx from 'clsx'

import { ImQuotesLeft } from 'react-icons/im'
import { IoPause, IoPlay } from 'react-icons/io5'
import { MdSkipNext } from 'react-icons/md'

interface MusicPlayerProps {
  playlist: SpotifyApi.PlaylistBaseObject
}

export function MusicPlayer(props: MusicPlayerProps) {
  const { playlist } = props
  const [currentTime, setCurrentTime] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<Spotify.Player>()

  const millisecondsToSongTime = useMemo(() => {
    const duration = playlist.tracks.items[0].track.duration_ms

    let seconds = Math.floor(duration / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60
    hours = hours & 24

    return `${hours > 0 ? hours + ';' : ''}${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }, [playlist.tracks.items])

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.warn('onSpotifyWebPlaybackSDKReady')

      // const emphemeralToken =
      //   'BQBFxaBCFTN82Pnml1N1983RZ1JM_QOukE3wwkCdDUxjaamixmC1KO5w3_JRvPSG2OnWxFfmIUDFJsOcOlwq0SCYPftFUAat_Eslzs28mgylo6BwZj5nWAdXB0lRYgNdmXAqkug8pTareSnH0UCpEhEmb8QCS7xm0iZ8JbovqkFbqLkFS7KASYB7ESc0SO-4xHw4-JpjlUjmVjJepNdApDjfvcIMb8qk'

      const player = new Spotify.Player({
        name: 'Dreamee.vn - Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(props.playlist.accessToken)
        },
        volume: 0.5
      })

      setPlayer(player)
      console.log('player:', player)

      player.addListener('ready', (a) => {
        console.log('Ready with Device ID', a)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('initialization_error', ({ message }) => {
        console.error(message)
      })

      player.addListener('authentication_error', ({ message }) => {
        console.error(message)
      })

      player.addListener('account_error', ({ message }) => {
        console.error(message)
      })

      console.warn('player connecting...')
      player.connect().then((success) => {
        if (success) {
          console.warn('The Web Playback SDK successfully connected to Spotify!')
        }
      })
    }
  }, [])

  useEffect(() => {
    setCurrentTime(0)

    const previewSongInterval = setInterval(() => {
      setCurrentTime((prev) => prev + 1)

      if (currentTime === 10) {
        clearInterval(previewSongInterval)
      }
    }, 1000)
  }, [])

  return (
    <div className="container relative h-screen flex flex-col justify-end items-center">
      <div
        className={clsx(
          '-translate-y-32',
          'bg-black bg-opacity-20',
          'rounded-md border border-white border-opacity-20',
          'mx-5 max-w-lg w-full',
          'text-white'
        )}
      >
        <header className="text-center mb-5 px-5 pt-5">
          <span className="font-medium font-highlight">Today&apos;s Song</span>
        </header>

        <main className="px-5">
          <section className="flex items-start justify-between gap-5">
            <Image
              src={playlist.images[0].url}
              alt="playlist_avatar"
              width={100}
              height={100}
              className="rounded-md shadow-lg"
            />

            <div className="relative">
              <ImQuotesLeft
                size={30}
                className="absolute z-0 -top-3 -left-2 text-white text-opacity-20"
              />
              <p className="text-xs sm:text-base mb-3 relative z-10">{playlist.description}</p>
            </div>
          </section>
        </main>

        {/* player controls */}
        <footer className="mt-10">
          <div className="h-0.5 w-full mx-auto bg-white bg-opacity-10 mb-2"></div>

          <div
            className={clsx(
              // 'bg-black bg-opacity-20 backdrop-blur-sm',
              'rounded-md overflow-hidden'
            )}
          >
            {/* song name, artists */}
            <section className="mt-3 mb-5">
              <p className="text-center">
                <a
                  href={playlist.tracks.items[0].track.external_urls.spotify}
                  target="_blank"
                  className="font-medium hover:underline"
                  title="View full song on Spotify"
                >
                  {playlist.tracks.items[0].track.name}
                </a>
              </p>

              <div className="text-center text-sm text-white text-opacity-50">
                {playlist.tracks.items[0].track.artists.map((artist, index) => {
                  return (
                    <p key={artist.id}>
                      <a
                        key={artist.id}
                        href={artist.external_urls.spotify}
                        target="_blank"
                        className="hover:underline"
                        title="View artist profile on Spotify"
                      >
                        {artist.name}
                      </a>

                      {index < playlist.tracks.items[0].track.artists.length - 1 && ', '}
                    </p>
                  )
                })}
              </div>
            </section>

            {/* audio controls */}
            <section className="flex justify-center items-center gap-5">
              <MdSkipNext size={30} role="button" className="cursor-pointer rotate-180" />

              <button
                role="button"
                aria-label="Play or Pause music player"
                className="bg-white hover:bg-opacity-50 p-2 rounded-full w-fit cursor-pointer"
              >
                {isPlaying ? (
                  <IoPause className="text-black" size={24} />
                ) : (
                  <IoPlay className="text-black translate-x-0.5" size={24} />
                )}
              </button>

              <MdSkipNext size={30} role="button" className="cursor-pointer" />
            </section>

            {/* <audio src={playlist.tracks.items[0].track.preview_url} autoPlay></audio> */}

            <section className="flex justify-between items-center text-sm px-3 mb-2 text-white text-opacity-50">
              <p className="flex-1">0:00</p>

              <p className="flex-1 flex justify-end">{millisecondsToSongTime}</p>
            </section>

            {/* track progress bar */}
            <section className="w-full h-1 bg-gray-500 bg-opacity-75 overflow-hidden">
              <div style={{ width: `${currentTime}%` }} className="h-1 bg-green-600" />
            </section>
          </div>
        </footer>
      </div>
    </div>
  )
}
