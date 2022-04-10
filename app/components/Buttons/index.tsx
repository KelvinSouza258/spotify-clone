import type { ReactNode } from 'react'
import { usePlayerDevice } from 'react-spotify-web-playback-sdk'

const play = (uri: string, token: string, id?: string) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

interface ButtonProps {
    uri: string
    token: string
    children: ReactNode
}

const PlayButton = ({ uri, token, children }: ButtonProps) => {
    const device = usePlayerDevice()

    return (
        <button onClick={() => play(uri, token, device?.device_id)}>
            {children}
        </button>
    )
}

export default PlayButton
