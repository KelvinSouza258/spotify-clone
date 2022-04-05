import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { Form, useCatch } from '@remix-run/react'

import { authorize, storage } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
    const session = await storage.getSession(request.headers.get('Cookie'))

    if (session.get('token') && session.get('refresh_token')) {
        return redirect('/')
    }

    return null
}

export const action: ActionFunction = (request) => {
    return authorize()
}

const Login = () => {
    return (
        <Form method="post" className="flex text-center w-72">
            <button
                className="flex-1 p-2 bg-teal-700 hover:bg-teal-400 rounded transition-colors duration-300"
                type="submit"
            >
                Login
            </button>
        </Form>
    )
}

export const CatchBoundary = () => {
    const caught = useCatch()

    return (
        <div>
            <p>{caught.statusText}</p>
            <p>{caught.status}</p>
        </div>
    )
}

export default Login
