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
} from '@remix-run/react'
import { useCallback } from 'react'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'

import styles from './styles/app.css'
import { storage } from './utils/session.server'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Spotify Clone',
    viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader: LoaderFunction = async ({ request }) => {
    const session = await storage.getSession(request.headers.get('Cookie'))
    const token = session.get('access_token')
    const refreshToken = session.get('refresh_token')
    const path = new URL(request.url).pathname

    if (token && refreshToken) {
        const res = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (res.status === 200) {
            return token
        } else if (res.status === 401) {
            return redirect(`/token/refresh?redirectTo=${path}`)
        } else if (res.status === 403) {
            throw new Error('Add user to Spotify App Dashboard')
        }

        throw new Error('Something went wrong')
    }

    const unauthorizedPaths = ['/login', '/token/refresh', '/token/get']

    if (unauthorizedPaths.includes(path)) {
        return null
    }

    return redirect('/login')
}

export default function App() {
    const token = useLoaderData<string>()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getOAuthTOken = useCallback((callback) => callback(token), [])

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-darkGray text-white">
                <WebPlaybackSDK
                    initialDeviceName="Spotify Web App"
                    initialVolume={0.5}
                    connectOnInitialized={true}
                    getOAuthToken={getOAuthTOken}
                >
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </WebPlaybackSDK>
            </body>
        </html>
    )
}
