import { notFound } from "next/navigation" //must be there for the notFound tot work

export const dynamicParams = true //tells next to return 404 page if a user tries to land on a ticcket page that has an id different from any of the pages it's already made
// true= makes it so in case of new tickets that don't already have pages, next is gonna try and fetch data for the ticket and create a page in case it exists.  Once that is done once, it can generate a static page for future requests

//for dynamic metadata
export async function generateMetadata({ params }) {
    const id = params.id

    const res = await fetch(`http://localhost:4000/tickets/${id}`) //forward slash whatever id of the page
    const ticket = await res.json() //this returns the full object of whatever the ticket's details are
    return {
        title: `Dojo Helpdesk | ${ticket.title}`
    }
}


export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    return tickets.map((ticket) => ({
        id: ticket.id
    }))
    //would make all the routes an pages ahead of time
    //get a list of all of the ids for all tickets at build time so next makes a page and a corresponding route for each one.
}


async function getTicket(id) {
    // //imitate 3 second delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60
            //how long next should wait since last page visit before revalidating data/refetching so once another request comes in, it shows revalidated data
            //make it 0 to opt out of using the cached data
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()

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