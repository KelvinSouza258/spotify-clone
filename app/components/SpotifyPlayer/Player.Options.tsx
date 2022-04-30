import { useEffect, useState } from 'react'
import { getTrackBackground, Range } from 'react-range'
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk'

const PlayerOptions = () => {
    const player = useSpotifyPlayer()

    const [volume, setVolume] = useState(0.5)
    const [isHovering, setIsHovering] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [previousVolume, setPreviousVolume] = useState(volume)

    useEffect(() => {
        player?.getVolume().then(setVolume)
    }, [player])

    useEffect(() => {
        player?.setVolume(volume)
    }, [player, volume])

    return (
        <div className="col-span-1 flex flex-col justify-center justify-self-end">
            <input
                type="range"
                className="invisible"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => {
                    setVolume(Number(e.target.value))
                }}
            />
            <div
                className="flex-grow h-4 flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <button
                    onClick={() => {
                        if (isMuted) {
                            setIsMuted(false)
                            setVolume(previousVolume)
                        } else {
                            setIsMuted(true)
                            setPreviousVolume(volume)
                            setVolume(0)
                        }
                    }}
                >
                    {volume === 0 ? (
                        <svg
                            role="presentation"
                            height="16"
                            width="16"
                            aria-label="Volume off"
                            id="volume-icon"
                            viewBox="0 0 16 16"
                            style={{ fill: 'currentColor' }}
                        >
                            <path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path>
                            <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                        </svg>
                    ) : null}
                    {volume > 0 && volume < 0.33 ? (
                        <svg
                            role="presentation"
                            height="16"
                            width="16"
                            aria-label="Volume low"
                            id="volume-icon"
                            viewBox="0 0 16 16"
                            style={{ fill: 'currentColor' }}
                        >
                            <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
                        </svg>
                    ) : null}
                    {volume > 0.33 && volume < 0.66 ? (
                        <svg
                            role="presentation"
                            height="16"
                            width="16"
                            aria-label="Volume medium"
                            id="volume-icon"
                            viewBox="0 0 16 16"
                            style={{ fill: 'currentColor' }}
                        >
                            <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path>
                        </svg>
                    ) : null}
                    {volume > 0.66 ? (
                        <svg
                            role="presentation"
                            height="16"
                            width="16"
                            aria-label="Volume high"
                            id="volume-icon"
                            viewBox="0 0 16 16"
                            style={{ fill: 'currentColor' }}
                        >
                            <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
                            <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path>
                        </svg>
                    ) : null}
                </button>
                <Range
                    min={0}
                    max={1}
                    values={[volume]}
                    step={0.05}
                    onChange={(values) => {
                        setIsDragging(true)
                        setVolume(values[0])
                    }}
                    onFinalChange={(values) => {
                        setIsDragging(false)
                        setVolume(values[0])
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            onScroll={(e) => {
                                // change volume on scroll
                            }}
                            style={{
                                ...props.style,
                                height: '12px',
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '4px',
                                    width: '100%',
                                    borderRadius: '2px',
                                    background: getTrackBackground({
                                        values: [volume],
                                        colors: [
                                            `${
                                                isHovering || isDragging
                                                    ? '#1db954'
                                                    : '#ffffff'
                                            }`,
                                            '#5e5e5e',
                                        ],
                                        min: 0,
                                        max: 1,
                                    }),
                                    alignSelf: 'center',
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                display: `${
                                    isHovering || isDragging ? 'block' : 'none'
                                }`,
                                height: '12px',
                                width: '12px',
                                backgroundColor: '#ffffff',
                                border: 'none',
                                borderRadius: '50%',
                            }}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default PlayerOptions
