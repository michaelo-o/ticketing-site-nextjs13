//We can make route handlers to this endpoint for post, get, delete and so on
// endpoint would be /api/tickets
//cannot be put in the same directory as a page.js file--would lead to route conflict
//fetching data from a client component, you need do api rout handler for get request??? Normally, it'd be done from the component instead


// Route handlers can be static & dynamic. Static are cached at build time and during dev. Dynamic are not and are run seperately on every request

// Arrow function not working with GET requests for some reason


import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'


export const dynamic = 'force-dynamic'
// would force every route handler in this file to be dynamic and not static. It'd re run from scratch on server each time a request comes in


export async function POST(request) {

    const ticket = await request.json()

    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies })

    // get current user session
    const { data: { session } } = await supabase.auth.getSession()

    // insert the data
    const { data, error } = await supabase.from('tickets')
        .insert({
            ...ticket,
            user_email: session.user.email,
        })
        .select()
        .single()
    return NextResponse.json({ data, error })

    //.from is a function using tables in database. Means getting something from a particular database table
    //this is how we insert a new object or record into the table 
    // .select()--so we get the data back
    // .single()--so it's not in array format and comes back as a json object


}

