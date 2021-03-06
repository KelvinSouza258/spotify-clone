import type { LoaderFunction } from '@remix-run/node'

import { getUserSession, getValidToken, storage } from '~/utils/session'

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getUserSession(request)

    const token = await getValidToken(request)

    session.set('access_token', token)

    return new Response(JSON.stringify({ token }), {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}
