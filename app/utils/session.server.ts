import { createCookieSessionStorage, redirect } from '@remix-run/node'

export const authorize = async () => {
    const baseUrl = 'https://accounts.spotify.com/authorize?'
    const scopes = [
        'streaming',
        'user-read-private',
        'user-read-email',
        'user-follow-read',
        'user-top-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-library-read',
        'user-library-modify',
        'playlist-read-private',
        'playlist-read-collaborative',
    ].join(',')

    const url =
        baseUrl +
        new URLSearchParams({
            scope: scopes,
            client_id: process.env.CLIENT_ID ?? '',
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI ?? '',
        })

    return redirect(url)
}

export const getTokens = async (code: string) => {
    const baseUrl = 'https://accounts.spotify.com/api/token'
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI ?? '',
        client_id: process.env.CLIENT_ID ?? '',
        client_secret: process.env.CLIENT_SECRET ?? '',
    })

    const response = await fetch(baseUrl, {
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

    interface SpotifyResponse {
        access_token: string
        token_type: string
        expires_in: number
        refresh_token: string
        scope: string
    }

    const json: SpotifyResponse = await response.json()

    return json
}

export const storage = createCookieSessionStorage({
    cookie: {
        name: 'tokens',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.COOKIE_SECRET ?? ''],
        secure: true,
    },
})

export const createUserSession = async (
    token: string,
    refresh_token: string
) => {
    let session = await storage.getSession()
    session.set('token', token)
    session.set('refresh_token', refresh_token)

    return redirect(`/`, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

export const getUserSession = async (request: Request) => {
    const session = await storage.getSession(request.headers.get('Cookie'))

    if (!session.get('token') || !session.get('refresh_token')) {
        throw redirect('/login')
    }

    return session
}

export const logout = async (request: Request) => {
    let session = await getUserSession(request)
    return redirect(`/`, {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}
