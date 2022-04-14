import type { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useCallback } from 'react'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'

import MainSideBar from '~/components/MainSideBar'
import { SpotifyPlayer } from '~/components/SpotifyPlayer'
import type { Playlists } from '~/types'
import { fetchUserPlaylists } from '~/utils/spotify'

interface LoaderData {
    token: string
    playlists: Playlists
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData | Response> => {
    const baseUrl = new URL(request.url).origin

    const res = await fetch(`${baseUrl}/token/get`, {
        headers: request.headers,
    })

    const { token } = await res.json()

    const playlists = await fetchUserPlaylists(token)

    return { playlists, token }
}

const Home = () => {
    const data = useLoaderData<LoaderData | null>()

    const getOAuthTOken = useCallback(
        (callback) =>
            fetch('/token/get')
                .then((res) => res.json())
                .then(({ token }: { token: string }) => callback(token)),
        []
    )
    return (
        <div className="bg-darkGray text-white min-h-screen grid grid-rows-[1fr_auto] grid-cols-[250px_1fr]">
            <WebPlaybackSDK
                initialDeviceName="Spotify Web App"
                initialVolume={0.5}
                connectOnInitialized={true}
                getOAuthToken={getOAuthTOken}
            >
                {data ? <MainSideBar playlists={data.playlists} /> : null}
                <Outlet />
                <div className="col-span-2">
                    <SpotifyPlayer />
                </div>
            </WebPlaybackSDK>
        </div>
    )
}

export default Home
