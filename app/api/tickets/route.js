//We can make route handlers to this endpoint for post, get, delete and so on
// endpoint would be /api/tickets
//cannot be put in the same directory as a page.js file--would lead to route conflict
//fetching data from a client component, you need do api rout handler for get request??? Normally, it'd be done from the component instead


// Route handlers can be static & dynamic. Static are cached at build time and during dev. Dynamic are not and are run seperately on every request

import { NextResponse } from "next/server"

// Arrow function not working for some reason

export const dynamic = 'force-dynamic'
// would force every route handler in this file to be dynamic and not static. It'd re run from scratch on server each time a request comes in

export async function GET() {
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    return NextResponse.json(tickets, {
        status: 200
    })
}

//we have GET request handler, fetch data inside that, and return a NextResponse where we send some json datw which is the tickets and set the status of the response. Status 200: OK


//post request has a request body, which is the data to be posted and it is recieved in the function argument. On it we can get access to the Json sent with the post request
export async function POST(request) {

    const ticket = await request.json()

    const res = await fetch('http://localhost:4000/tickets', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //basically saying the data being sent is json data
        body: JSON.stringify(ticket) //this is the actual data being sent. Stringify passes/converts it in as a string
    })

    const newTicket = await res.json()

    return NextResponse.json(newTicket, { status: 201 })
    //with postman, request body is raw json
}
