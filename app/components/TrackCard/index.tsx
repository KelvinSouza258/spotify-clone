import { usePlayerDevice } from 'react-spotify-web-playback-sdk'

import type { Track } from '~/types'

const play = (track: Track, token: string, id?: string) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [track.uri] }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

interface ButtonProps {
    track: Track
    token: string
}

const TrackCard = ({ track, token }: ButtonProps) => {
    const device = usePlayerDevice()

    return (
        <div className="p-4 group flex flex-col gap-6 rounded-lg bg-darkGray hover:bg-hoverGray transition-colors duration-200">
            <div className="relative w-full h-full">
                <img
                    className="rounded-md w-full h-full"
                    src={track.album.images[0].url}
                    alt={track.name}
                />
                <button
                    className="hover:scale-110 z-10 invisible absolute bottom-0 p-2 right-2 rounded-full bg-green opacity-0 text-darkerGray group-hover:visible group-hover:opacity-100 group-hover:bottom-2 transition-all duration-300 ease-in-out"
                    onClick={() => play(track, token, device?.device_id)}
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z" />
                    </svg>
                </button>
            </div>
            <div>
                <p
                    title={track.name}
                    className="font-nunito font-extrabold text-white text-ellipsis whitespace-nowrap overflow-hidden"
                >
                    {track.name}
                </p>
                <p
                    title={track.artists[0].name}
                    className="font-nunito font-semibold text-sm text-darkWhite text-ellipsis whitespace-nowrap overflow-hidden"
                >
                    {track.artists[0].name}
                </p>
            </div>
        </div>
    )
}

export default TrackCard
