import { useEffect, useState } from 'react'
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk'

const PlayerOptions = () => {
    const player = useSpotifyPlayer()

    const [volume, setVolume] = useState(50)

    useEffect(() => {
        player?.getVolume().then((v) => setVolume(Math.round(v * 100)))
    }, [player])

    useEffect(() => {
        player?.setVolume(volume / 100)
    }, [player, volume])

    return (
        <div className="col-span-1 justify-self-end">
            <p>Volume atual: {volume}</p>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => {
                    setVolume(Number(e.target.value))
                }}
            />
        </div>
    )
}

export default PlayerOptions
