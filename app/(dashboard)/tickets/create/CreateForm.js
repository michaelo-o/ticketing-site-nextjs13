"use client"
//to make it a client component, so it hydrates in the browser. For interactivity sake

import { useRouter } from "next/navigation"
import { useState } from "react";


const CreateForm = () => {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        //get access to event object to prevent the default action of a form which is to refresh
        e.preventDefault()
        setIsLoading(true)

        const newTicket = { title, body, priority };

        //post request so server adds new data
        const res = await fetch('http://localhost:3000/api/tickets', {
            method: "POST",
            headers: { "Content-Type": "application/json" }, //basically saying the data being sent is json data
            body: JSON.stringify(newTicket) //this is the actual data being sent. Stringify passes/converts it in as a string
        })

        // if (res.status === 201) { //201-good response, resource created
        //     router.refresh()
        //     router.push('/tickets')
        // }

        const json = await res.json();

        if (json.error) {
            console.log(error.message)
        }

        if (json.data) {
            router.refresh() //to refresh the page in the backgroud
            router.push('/tickets')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2">
            {/* half page width */}
            <label>
                <span>Title:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    // on change, we set the value of the Title to whatever is currently inputed. Target that value of the event
                    value={title}
                />
            </label>
            <label>
                <span>Body:</span>
                <textarea
                    required
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                />
            </label>
            <label>
                <span>Priority:</span>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>
            <button
                className="btn-primary"
                disabled={isLoading} //when clicked, disable the button to prevent spamming
            >
                {isLoading ? (<span>Adding...</span>)
                    : (<span>Add Ticket</span>)
                }

                {/* {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Ticket</span>} */}
            </button>

        </form>

    );
}

export default CreateForm;