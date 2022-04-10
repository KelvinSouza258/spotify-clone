import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'
import { useCallback } from 'react'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'

import MainSideBar from './components/MainSideBar'
import { SpotifyPlayer } from './components/SpotifyPlayer'
import styles from './styles/app.css'
import type { Playlists } from './types'
import { VerifyToken } from './utils/session.server'
import { fetchUserPlaylists } from './utils/spotify.server'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Spotify Clone',
    viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

interface LoaderData {
    token: string
    playlists: Playlists
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData | null> => {
    const token = await VerifyToken(request)

    if (token === null) return null

    const playlists = await fetchUserPlaylists(token)

    return { token, playlists }
}

export default function App() {
    const data = useLoaderData<LoaderData | null>()

    const getOAuthTOken = useCallback(
        (callback) => callback(data?.token),
        [data?.token]
    )

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <div className="bg-darkGray text-white min-h-screen grid grid-rows-[1fr_auto] grid-cols-[250px_1fr]">
                    <WebPlaybackSDK
                        initialDeviceName="Spotify Web App"
                        initialVolume={0.5}
                        connectOnInitialized={true}
                        getOAuthToken={getOAuthTOken}
                    >
                        {data ? (
                            <MainSideBar playlists={data.playlists} />
                        ) : null}
                        <Outlet />
                        <div className="col-span-2">
                            <SpotifyPlayer />
                        </div>
                        <ScrollRestoration />
                        <Scripts />
                        <LiveReload />
                    </WebPlaybackSDK>
                </div>
            </body>
        </html>
    )
}
