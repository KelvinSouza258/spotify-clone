import { useLayoutEffect, useState } from 'react'
import { getTrackBackground, Range } from 'react-range'
import {
    usePlaybackState,
    useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk'

import { formatMilliseconds } from '~/utils/helpers'

const PlayerButtons = () => {
    const player = useSpotifyPlayer()
    const playbackState = usePlaybackState(true, 500)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [trackPosition, setTrackPosition] = useState(
        playbackState?.position ?? 0
    )

    useLayoutEffect(() => {
        if (!isDragging) {
            setTrackPosition(playbackState?.position ?? 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackState?.position])

    return (
        <div className="flex flex-col col-span-1 gap-2 items-center">
            <div className="flex items-center p-2 gap-4">
                <button
                    className="hover:text-white text-darkWhite transition-colors duration-200"
                    onClick={() => player?.previousTrack()}
                >
                    <svg
                        role="img"
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                        style={{ fill: 'currentColor' }}
                    >
                        <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path>
                    </svg>
                </button>
                <button
                    className="bg-white w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={() => player?.togglePlay()}
                >
                    {playbackState?.paused ? (
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                        </svg>
                    ) : (
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
                        </svg>
                    )}
                </button>
                <button
                    className="hover:text-white text-darkWhite transition-colors duration-200"
                    onClick={() => player?.nextTrack()}
                >
                    <svg
                        role="img"
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                        style={{ fill: 'currentColor' }}
                    >
                        <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
                    </svg>
                </button>
            </div>
            <div className="flex items-center gap-3 w-full">
                {formatMilliseconds(trackPosition ?? 0)}
                <div
                    className="flex-grow h-3 flex items-center"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <Range
                        min={0}
                        max={playbackState?.duration}
                        values={[trackPosition ?? 0]}
                        step={1000}
                        onChange={(values) => {
                            setTrackPosition(values[0])
                            setIsDragging(true)
                        }}
                        onFinalChange={(values) => {
                            setTrackPosition(values[0])
                            player?.seek(Number(values[0]))
                            setIsDragging(false)
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
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
                                            values: [trackPosition ?? 0],
                                            colors: [
                                                `${
                                                    isHovering
                                                        ? '#1db954'
                                                        : '#ffffff'
                                                }`,
                                                '#5e5e5e',
                                            ],
                                            min: 0,
                                            max: playbackState?.duration ?? 1,
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
                                    display: `${isHovering ? 'block' : 'none'}`,
                                    height: '12px',
                                    width: '12px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '50%',
                                }}
                            />
                        )}
                    />
                </div>
                {formatMilliseconds(playbackState?.duration ?? 0)}
            </div>
        </div>
    )
}

export default PlayerButtons
