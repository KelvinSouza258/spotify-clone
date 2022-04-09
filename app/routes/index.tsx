import type { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import type { Playlists, User } from '~/types'
import { getUserSession } from '~/utils/session.server'

const fetchUserData = async (token: string) => {
    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return await res.json()
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

interface LoaderData {
    user: User
    playlists: Playlists
}

export const loader: LoaderFunction = async ({
    request,
}): Promise<LoaderData> => {
    const session = await getUserSession(request)
    const token = session.get('access_token')

    const user: User = await fetchUserData(token)

    const playlists = await fetchUserPlaylists(user.id, token)

    return { user, playlists }
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
            <Outlet />
        </>
    )
}

export default Home
