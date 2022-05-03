import { Link } from '@remix-run/react'

import type { Playlists } from '~/types'

import Logo from '~/assets/logo.svg'

interface SideBarProps {
    playlists: Playlists
}

const MainSideBar = ({ playlists }: SideBarProps) => {
    return (
        <div className="flex flex-col pt-6 text-sm overflow-y-auto bg-black">
            <Link
                to="/"
                className="flex items-center text-xl font-nunito font-extrabold gap-2 px-6 mb-4"
            >
                <img className="h-12 w-12" src={Logo} alt="logo" />
                Spotify Clone
            </Link>
            <nav className="flex flex-col text-darkWhite font-bold gap-6">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className="flex gap-4 py-2 px-6 items-center hover:text-white transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/search"
                            className="flex gap-4 py-2 px-6 items-center hover:text-white transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/collection"
                            className="flex gap-4 py-2 px-6 items-center hover:text-white transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                            </svg>
                            Your Library
                        </Link>
                    </li>
                </ul>

                <Link
                    to="/collection/tracks"
                    className="flex gap-4 py-2 px-6 items-center hover:text-white transition-colors duration-200"
                >
                    <div className="h-7 w-7 grid place-items-center bg-gradient-to-r from-indigo-700 to-slate-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    Liked Songs
                </Link>
            </nav>

            <hr className="mx-4 mt-2 border-lightGray" />

            <div className="py-2 pr-2 overflow-y-auto scrollbar  scrollbar-track-black scrollbar-thumb-lightGray">
                {playlists.items.map((playlist) => {
                    return (
                        <Link
                            to={`/playlists/${playlist.id}`}
                            prefetch="intent"
                            key={playlist.id}
                            className="px-6 h-8 w-full flex items-center text-darkWhite hover:text-white"
                        >
                            <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                                {playlist.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default MainSideBar
