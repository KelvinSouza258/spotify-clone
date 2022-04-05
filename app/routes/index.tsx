import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getUserSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getUserSession(request)
    const token = session.get('token')

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return await response.json()
}

export default function Index() {
    const data = useLoaderData<any>()
    return (
        <>
            <h1 className="text-3xl font-bold text-center">
                Hi {data?.display_name}
            </h1>
            <p>Email: {data?.email}</p>
        </>
    )
}
