import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation" //must be there for the notFound to work

export const dynamicParams = true //tells next to return 404 page if a user tries to land on a ticket page that has an id different from any of the pages it's already made
// true= makes it so in case of new tickets that don't already have pages, next is gonna try and fetch data for the ticket and create a page in case it exists.  Once that is done once, it can generate a static page for future requests


export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })

    const { data: ticket } = await supabase.from('tickets')
        .select()
        .eq('id', params.id)
        .single()

    return {
        title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not Found'}`
    }
    //the ? is to check for a value for ticket in case there's no value do it does not search for a title on null
    //eq() --selecting based on certain criteria. Where the two arguments are equal, grab that one and the .single is so it would not return an array
}


async function getTicket(id) {

    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.from('tickets')
        .select()
        .eq('id', id) //selecting based on certain criteria. Where the two arguments are equal, grab that one and the .single is so it would not return an array
        .single()

    if (!data) {
        notFound()
    }

    return data

    // //imitate 3 second delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    // const res = await fetch('http://localhost:4000/tickets/' + id, {
    //     next: {
    //         revalidate: 60
    //         //how long next should wait since last page visit before revalidating data/refetching so once another request comes in, it shows revalidated data
    //         //make it 0 to opt out of using the cached data
    //     }
    // })

    // if (!res.ok) {
    //     notFound()
    // }

    // return res.json()

}
const TicketDetails = async ({ params }) => {
    const ticket = await getTicket(params.id)
    return (
        <>
            <main>
                <nav>
                    <h2>Ticket Details</h2>
                </nav>
                <div className="card">
                    <h3>{ticket.title}</h3>
                    <small>Created by {ticket.user_email}</small>
                    <p>{ticket.body}</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div> {/*div with a classname of pill, but also whatever the priority property is */}
                </div>
            </main>
        </>
    );
}

export default TicketDetails;