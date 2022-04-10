import { Link } from '@remix-run/react'
import { usePlaybackState } from 'react-spotify-web-playback-sdk'

import { getIDfromURI } from '~/utils/helpers'

const SongInfo = () => {
    const playbackState = usePlaybackState()
    const currentTrack = playbackState?.track_window.current_track

    if (playbackState === null || !currentTrack) {
        return (
            <div className="flex-grow">
                <div className="bg-lightGray w-14 h-14" />
            </div>
        )
    }

    const albumID = getIDfromURI(currentTrack.album.uri)
    const artistID = getIDfromURI(currentTrack.artists[0].uri)

    return (
        <div className="flex col-span-1 gap-2 items-center">
            <img
                className="w-14 h-14"
                src={currentTrack.album.images[0].url}
                alt=""
            />
            <div className="flex flex-col items-start">
                <Link
                    className="hover:underline"
                    prefetch="intent"
                    to={`/albums/${albumID}`}
                >
                    {currentTrack.name}
                </Link>
                <Link
                    className="text-xs text-lightGray hover:underline hover:text-white"
                    prefetch="intent"
                    to={`/artist/${artistID}`}
                >
                    {currentTrack.artists[0].name}
                </Link>
            </div>
        </div>
    )
}

export default SongInfo
