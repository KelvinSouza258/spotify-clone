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

interface Image {
    width: number
    height: number
    url: string
}

interface SpotifyItem {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
}

interface Owner extends SpotifyItem {
    display_name: string
}

interface Artist extends SpotifyItem {
    followers: {
        href: string
        total: number
    }
    genres: string[]
    images: Image[]
    name: string
    popularity: number
}

interface Album extends SpotifyItem {
    album_type: string
    artists: SpotifyItem[]
    available_markets: string[]
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
}

export interface Track extends SpotifyItem {
    album: Album
    artists: Artist[]
    available_markets: string[]
    disc_number: string
    duration_ms: number
    episode: boolean
    explicit: boolean
    external_ids: {
        isrc: string
    }
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    linked_from: Track
}

export interface PlaylistItem {
    added_at: string
    added_by: SpotifyItem
    is_local: boolean
    primary_color: string | null
    track: Track
    video_thumbnail: { url: string | null }
}

export interface Playlist extends SpotifyItem {
    collaborative: boolean
    description: string
    images: Image[]
    name: string
    owner: Owner
    primary_color: string | null
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        items: PlaylistItem[]
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
    }
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

export interface RecentlyPlayed {
    cursors: { after: string; before: string }
    href: string
    limit: number
    next: string
    items: {
        track: Track
        context: SpotifyItem
        played_at: string
    }[]
}
