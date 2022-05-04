import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import TrackCard from '~/components/TrackCard'
import type { RecentlyPlayed } from '~/types'
import { getValidToken } from '~/utils/session'

interface LoaderData {
    recent: RecentlyPlayed
    token: string | null
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData> => {
    const token = await getValidToken(request)
    const res = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=5',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const recent: RecentlyPlayed = await res.json()
    return { recent, token }
}

const Home = () => {
    const { recent, token } = useLoaderData<LoaderData>()

    return (
        <div className="flex flex-col gap-3 p-4 overflow-y-auto scrollbar scrollbar-track-black scrollbar-thumb-lightGray">
            <div className="flex flex-col gap-2">
                <h3 className="font-nunito font-extrabold text-2xl">
                    Recently played tracks
                </h3>
                <div className="grid grid-cols-5 gap-3">
                    {recent.items.map((item) => {
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
