import { SpotifyRefreshDailyTokenClient } from './client'

const SpotifyRefreshDailyToken = async () => {
  return (
    <SpotifyRefreshDailyTokenClient
      clientId={process.env.SPOTIFY_CLIENT_ID || ''}
      redirectUri={process.env.UI_CLIENT_SPOTIFY_AUTH_CALLBACK || ''}
    />
  )
}

SpotifyRefreshDailyToken.getLayout = () => <div></div>

export default SpotifyRefreshDailyToken
