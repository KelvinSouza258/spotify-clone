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
        if (volume > 0) {
            setIsMuted(false)
        }
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
                    className="text-darkWhite"
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
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                clip-rule="evenodd"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                        </svg>
                    )}
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
