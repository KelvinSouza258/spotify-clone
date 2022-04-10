import type { Playlists } from '~/types'

export const fetchUserPlaylists = async (token: string): Promise<Playlists> => {
    const res = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return await res.json()
}
