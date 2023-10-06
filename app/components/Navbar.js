import Image from 'next/image';
import Link from 'next/link'
import Logo from './dojo-logo.png'
import LogoutButton from './LogoutButton';

const Navbar = ({ user }) => {
    return (
        <nav>
            <Image
                src={Logo}
                alt='Dojo Helpdesk logo'
                width={70}
                placeholder='blur'
                quality={100}
            />
            <h1>Dojo Helpdesk</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets" className="mr-auto">Tickets</Link>


            {user && <span>Hello, {user.email}</span>}
            {/* There's an error that occurs when the dashboard route is not protected. When there is no logged in user and we try to output the email, there's an error because the user object is null at the time.
            1 way to combat is by conditionally outputting the email only if the user.email has a value..
            2 Way is to protect the route on the server before it even tries to render any page combponent or get to the navbar */}
            <LogoutButton />
        </nav>
    );
}

export default Navbar;