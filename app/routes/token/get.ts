import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { createUserSession, getTokens } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) return redirect('/login')

    const { access_token, refresh_token } = await getTokens(code ?? '')

    return createUserSession(access_token, refresh_token)
}
