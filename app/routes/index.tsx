import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import PlaylistCard from '~/components/PlaylistCard'
import TrackCard from '~/components/TrackCard'
import type { Playlist, Playlists } from '~/types'
import { getValidToken } from '~/utils/session'
import { fetchUserPlaylists } from '~/utils/spotify'

interface LoaderData {
    saved: Playlist
    playlists: Playlists
    token: string | null
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData> => {
    const token = await getValidToken(request)

    const res = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const saved: Playlist = await res.json()

    const playlists = await fetchUserPlaylists(token ?? '')

    return { saved, playlists, token }
}

const Home = () => {
    const { saved, playlists, token } = useLoaderData<LoaderData>()

    return (
        <div className="flex flex-col gap-8 p-4 overflow-y-auto scrollbar scrollbar-track-black scrollbar-thumb-lightGray">
            <div className="flex flex-col gap-2">
                <h3 className="font-nunito font-extrabold text-2xl">
                    Your Playlists
                </h3>
                <div className="grid grid-cols-5 gap-3">
                    {playlists.items.map((playlist) => {
                        return (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                                token={token ?? ''}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-nunito font-extrabold text-2xl">
                    Liked Songs
                </h3>
                <div className="grid grid-cols-5 gap-3">
                    {saved.items.map((item) => {
                        return (
                            <TrackCard
                                key={item.track.id}
                                track={item.track}
                                token={token ?? ''}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
