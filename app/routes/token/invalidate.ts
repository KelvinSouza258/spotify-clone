import type { LoaderFunction } from '@remix-run/node'

import { getUserSession, storage } from '~/utils/session'

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getUserSession(request)

    session.set('access_token', 'token')

    return new Response('invalidado', {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}
