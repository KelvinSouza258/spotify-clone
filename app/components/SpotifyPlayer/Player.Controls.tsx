import {
    usePlaybackState,
    useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk'

import { formatMilliseconds } from './Player.Helpers'

const PlayerButtons = () => {
    const player = useSpotifyPlayer()
    const playbackState = usePlaybackState(true, 500)

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
                            className="Svg-sc-1bi12j5-0 jgfuCe"
                        >
                            <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                        </svg>
                    ) : (
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            viewBox="0 0 16 16"
                            className="Svg-sc-1bi12j5-0 jgfuCe"
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
                        className="Svg-sc-1bi12j5-0 jgfuCe"
                        style={{ fill: 'currentColor' }}
                    >
                        <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
                    </svg>
                </button>
            </div>
            <div className="flex gap-2 w-full">
                {formatMilliseconds(playbackState?.position ?? 0)}
                <input
                    type="range"
                    className="flex-grow"
                    min="0"
                    max={playbackState?.duration}
                    value={playbackState?.position}
                />
                {formatMilliseconds(playbackState?.duration ?? 0)}
            </div>
        </div>
    )
}

export default PlayerButtons
