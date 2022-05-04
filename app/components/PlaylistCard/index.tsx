import { usePlayerDevice } from 'react-spotify-web-playback-sdk'

import type { Playlist } from '~/types'

const play = async (href: string, token: string, id?: string) => {
    const res = await fetch(href, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const playlist: Playlist = await res.json()

    const uris = playlist.tracks.items.map((item) => item.track.uri)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

interface ButtonProps {
    href: string
    token: string
}

const PlayButton = ({ href, token }: ButtonProps) => {
    const device = usePlayerDevice()

    return (
        <button
            className="roundend-full bg-green grid place-items-center px-4 py-2 text-darkerGray"
            onClick={() => play(href, token, device?.device_id)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    )
}

export default PlayButton
