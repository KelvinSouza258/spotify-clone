import { usePlayerDevice } from 'react-spotify-web-playback-sdk'

import type { Playlist, PlaylistInfo } from '~/types'

const play = async (playlist: PlaylistInfo, token: string, id?: string) => {
    console.log(playlist)
    const res = await fetch(playlist.tracks.href, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const playlistItems: Playlist = await res.json()

    console.log(playlistItems)

    const uris = playlistItems.items.map((item) => item.track.uri)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [...uris] }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

interface ButtonProps {
    playlist: PlaylistInfo
    token: string
}

const PlaylistCard = ({ playlist, token }: ButtonProps) => {
    const device = usePlayerDevice()

    return (
        <div className="p-4 group flex flex-col gap-6 rounded-lg bg-darkGray hover:bg-hoverGray transition-colors duration-200">
            <div className="relative w-full h-full">
                <img
                    className="rounded-md w-full h-full"
                    src={playlist.images.at(0)?.url}
                    alt={playlist.name}
                />
                <button
                    className="hover:scale-110 z-10 invisible absolute bottom-0 p-2 right-2 rounded-full bg-green opacity-0 text-darkerGray group-hover:visible group-hover:opacity-100 group-hover:bottom-2 transition-all duration-300 ease-in-out"
                    onClick={() => play(playlist, token, device?.device_id)}
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z" />
                    </svg>
                </button>
            </div>
            <div>
                <p
                    title={playlist.name}
                    className="font-nunito font-extrabold text-white text-ellipsis whitespace-nowrap overflow-hidden"
                >
                    {playlist.name}
                </p>
            </div>
        </div>
    )
}

export default PlaylistCard
