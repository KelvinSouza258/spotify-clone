export interface User {
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

export interface Playlists {
    href: string
    items: Playlist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}
