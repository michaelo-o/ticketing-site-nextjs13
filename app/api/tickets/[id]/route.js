// To GET just 1 ticket

import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
// would force every route handler in this file to be dynamic and not static. It'd re run from scratch on server each time a request comes in

export async function GET( request, { params }) {

    const id = params.id

    const res = await fetch(`http://localhost:4000/tickets/${id}`)

    const ticket = await res.json()

    if (!res.ok) {
        return NextResponse.json({ error: 'Cannot find the ticket' }, { status: 404 })
    }
    //this checks to see if the ticket actually exists, send an error if that's not the case.

    return NextResponse.json(ticket, {
        status: 200
    })
}