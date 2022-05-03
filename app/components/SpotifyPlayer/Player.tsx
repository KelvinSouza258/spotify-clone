import { useEffect } from 'react'
import {
    useErrorState,
    useWebPlaybackSDKReady,
} from 'react-spotify-web-playback-sdk'

import LoadingSpinner from '../LoadingSpinner'
import PlayerButtons from './Player.Controls'
import PlayerOptions from './Player.Options'
import SongInfo from './Player.SongInfo'

const SpotifyPlayer = () => {
    const ready = useWebPlaybackSDKReady()
    const error = useErrorState()

    useEffect(() => {
        if (error?.type === 'authentication_error') {
            throw new Response('Authentication error', { status: 401 })
        }
    }, [error])

    return (
        <>
            {ready ? (
                <div className="grid grid-cols-3 items-center gap-2 bg-darkGray px-4 h-24 border border-solid border-[#282828]">
                    <SongInfo />
                    <PlayerButtons />
                    <PlayerOptions />
                </div>
            ) : (
                <div className="w-full h-24 bg-darkGray flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
        </>
    )
}

export default SpotifyPlayer
