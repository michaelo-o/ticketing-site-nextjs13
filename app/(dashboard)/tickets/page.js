import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";


export const metadata = {
    title: 'Dojo Helpdesk | Tickets',
}


const Tickets = () => {
    return (
        <main>
            <nav>
                <div>
                    <h2>Tickets</h2>
                    <p><small>Currently Open Tickets.</small></p>
                </div>
            </nav>

            <Suspense fallback={<Loading />}>
                <TicketList />
            </Suspense>
            {/* 
            making suspense boundary around this, so the rest of the page can be rendered whilst this is loading
            The fallback prop manually registers the fallback loading screen and specifies the component to be used as a fallback, which in this case, is loading.js */}
        </main>
    );
}

export default Tickets;