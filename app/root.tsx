import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useLocation,
} from '@remix-run/react'
import { useCallback } from 'react'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'

import MainSideBar from './components/MainSideBar'
import { SpotifyPlayer } from './components/SpotifyPlayer'
import styles from './styles/app.css'
import type { Playlists } from './types'
import { getValidToken } from './utils/session'
import { fetchUserPlaylists } from './utils/spotify'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Spotify Clone',
    viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap',
    },
]

export const loader: LoaderFunction = async ({ request }) => {
    const path = new URL(request.url).pathname

    const token = await getValidToken(request)

    if (token === null && path !== '/login') {
        return redirect('/login')
    }
    const playlists = await fetchUserPlaylists(token ?? '')

    return { playlists }
}

interface LoaderData {
    playlists: Playlists
}

export default function App() {
    const { playlists } = useLoaderData<LoaderData>()
    const { pathname } = useLocation()

    const getOAuthTOken = useCallback(
        (callback) =>
            fetch('/token/get')
                .then((res) => res.json())
                .then(({ token }: { token: string }) => callback(token)),
        []
    )

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="font-nunito">
                {pathname !== '/login' ? (
                    <div className="bg-darkerGray text-white min-h-screen max-h-screen grid grid-rows-[1fr_auto] grid-cols-[250px_1fr]">
                        <WebPlaybackSDK
                            initialDeviceName="Spotify Web App"
                            initialVolume={0.5}
                            connectOnInitialized={true}
                            getOAuthToken={getOAuthTOken}
                        >
                            {playlists ? (
                                <MainSideBar playlists={playlists} />
                            ) : null}
                            <Outlet />
                            <div className="col-span-2">
                                <SpotifyPlayer />
                            </div>
                        </WebPlaybackSDK>
                    </div>
                ) : (
                    <Outlet />
                )}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
