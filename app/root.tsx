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
} from '@remix-run/react'

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
            return null
        } else if (res.status === 401) {
            return redirect(`/token/refresh?redirectTo=${path}`)
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
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
