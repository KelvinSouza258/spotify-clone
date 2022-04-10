import { Link } from '@remix-run/react'

import type { Playlists } from '~/types'

const MainSideBar = ({ playlists }: { playlists: Playlists }) => {
    return (
        <div className="flex flex-col gap-2 p-4 overflow-y-auto">
            {playlists.items.map((playlist) => {
                return (
                    <Link
                        to={`/playlists/${playlist.id}`}
                        prefetch="intent"
                        key={playlist.id}
                        className="text-darkWhite hover:text-white text-ellipsis whitespace-nowrap overflow-hidden"
                    >
                        {playlist.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default MainSideBar
