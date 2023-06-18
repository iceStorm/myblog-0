interface SpotifyPlayer {
  name: string
  volume: number
  getOAuthToken: (cb: (token: string) => unknown) => void
}

interface SpotifyPlayerEventCallback {
  device_id: string
  message: string
}

type SpotifyPlayerEvent =
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'ready'
  | 'not_ready'

declare namespace Spotify {
  export class Player {
    constructor(input: SpotifyPlayer)

    addListener(event: SpotifyPlayerEvent, callback: (infor: SpotifyPlayerEventCallback) => void)
    removeListener(
      event: SpotifyPlayerEvent,
      callback?: (infor: SpotifyPlayerEventCallback) => void
    )

    connect(): Promise<boolean>

    togglePlay(): Promise<void>

    activateElement(): Promise<void>

    getCurrentState(): Promise<{
      track_window: {
        current_track: unknown
        next_tracks: Array<>
      }
    }>
  }
}

interface Window {
  onSpotifyWebPlaybackSDKReady: () => void
}

declare namespace SpotifyApi {
  export interface PlaylistBaseObject {
    accessToken: string
    tracks: {
      href: string
      limit: number
      next: null
      offset: number
      previous: null
      total: number
      items: Array<{
        added_at: string
        added_by: any
        is_local: boolean
        primary_color: null
        track: {
          name: string
          preview_url: string
          duration_ms: number
          external_urls: {
            spotify: string
          }
          artists: Array<{
            external_urls: {
              spotify: string
            }
            href: string
            id: string
            name: string
            type: 'artist'
            uri: string
          }>
        }
        video_thumbnail: Array<>
      }>
    }
  }
}

// interface SpotifySong extends SpotifyApi {
//   name: string
// }
