import { notFound } from "next/navigation";

const NotFound = () => {
    return (
        notFound() //would serve us the nearest notFound function it can find which is inside the route grouped dashboard folder
    );
}

export default NotFound;    