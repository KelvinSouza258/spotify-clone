import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getUserSession } from '~/utils/session.server'

const fetchUserData = async (request: Request, token: string) => {
    return fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

const fetchUserPlaylists = async (user_id: string, token: string) => {
    const res = await fetch(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return await await res.json()
}

interface User {
    country: string
    display_name: string
    email: string
    explicit_content: { filter_enabled: boolean; filter_locked: boolean }
    external_urls: {
        spotify: string
    }
    followers: { href: null; total: number }
    href: string
    id: string
    images: { url: string; height: number; width: number }[]
    product: string
    type: string
    uri: string
}

interface Playlist {
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: [
        {
            height: number | null
            url: string
            width: number | null
        }
    ]
    name: string
    owner: {
        display_name: string
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        type: string
        uri: string
    }
    primary_color: string | null
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        total: number
    }
    type: string
    uri: string
}
interface Playlists {
    href: string
    items: Playlist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

interface LoaderData {
    user: User
    playlists: Playlists
    token: string
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData> => {
    const session = await getUserSession(request)
    const token = session.get('token')

    const res = await fetchUserData(request, token)
    const user: User = await res.json()

    const playlists = await fetchUserPlaylists(user.id, token)

    console.log(playlists)

    return { user, playlists, token }
}

const Home = () => {
    const data = useLoaderData<LoaderData>()

    return (
        <>
            <p>Playlists</p>
            <ul>
                {data.playlists.items.map((playlist) => {
                    return (
                        <li key={playlist.id}>
                            <p>
                                Name: {playlist.name} Owner:{' '}
                                {playlist.owner.display_name}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Home
