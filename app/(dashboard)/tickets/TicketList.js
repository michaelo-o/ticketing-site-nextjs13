import Link from "next/link"

async function getTickets() {

    //imitate 3 second delay
    // await new Promise(resolve => setTimeout(resolve, 3000))


    const res = await fetch('http://localhost:4000/tickets', {
        next: {
            revalidate: 0
            //60 * 60 * 12--for a day
            //how long next should wait since last page visit before revalidating data/refetching so once another request comes in, it shows revalidated data
            //make it 0 to opt out of using the cached data
        }
    })

    return res.json()

}


export default async function TicketList() {
    const tickets = await getTickets()

    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
        </>
    )
}
