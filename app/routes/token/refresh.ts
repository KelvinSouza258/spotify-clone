import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { getUserSession, storage } from '~/utils/session.server'

interface SpotifyResponse {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getUserSession(request)
    const refreshToken = session.get('refresh_token')
    const redirectTo = params.redirectTo || '/'

    if (!refreshToken) {
        return redirect('/login')
    }

    const baseUrl = 'https://accounts.spotify.com/api/token'
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    })

    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    })

    const json: SpotifyResponse = await res.json()

    session.set('access_token', json.access_token)

    return redirect(redirectTo, {
        headers: { 'Set-Cookie': await storage.commitSession(session) },
    })
}
