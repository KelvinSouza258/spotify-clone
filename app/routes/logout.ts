import type { LoaderFunction } from '@remix-run/node'

import { logout } from '~/utils/session'

export const loader: LoaderFunction = ({ request }) => {
    return logout(request)
}
