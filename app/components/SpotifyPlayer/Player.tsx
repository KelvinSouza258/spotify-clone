import { useWebPlaybackSDKReady } from 'react-spotify-web-playback-sdk'

import LoadingSpinner from '../LoadingSpinner'
import PlayerButtons from './Player.Controls'
import PlayerOptions from './Player.Options'
import SongInfo from './Player.SongInfo'

const SpotifyPlayer = () => {
    const ready = useWebPlaybackSDKReady()

    return (
        <>
            {ready ? (
                <div className="grid grid-cols-3 items-center gap-2 bg-darkGray p-4">
                    <SongInfo />
                    <PlayerButtons />
                    <PlayerOptions />
                </div>
            ) : (
                <div className="w-full h-20 bg-darkGray flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
        </>
    )
}

export default SpotifyPlayer
