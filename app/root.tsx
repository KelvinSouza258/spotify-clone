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
    useCatch,
} from '@remix-run/react'

import styles from './styles/app.css'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Spotify Clone',
    viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader: LoaderFunction = async ({ request }) => {
    const baseUrl = new URL(request.url).origin
    const path = new URL(request.url).pathname

    const res = await fetch(`${baseUrl}/token/get`, {
        headers: request.headers,
    })

    const { token } = await res.json()

    if (token === null && path !== '/login') {
        return redirect('/login')
    }

    return new Response('', { headers: res.headers })
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

export const CatchBoundary = () => {
    const caught = useCatch()

    if (caught.status === 401) fetch('/token/refresh')
}
