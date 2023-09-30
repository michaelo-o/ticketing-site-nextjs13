import Link from "next/link";

const AuthLayout = ({ children }) => {
    return (
        <>
            <nav>
                <h1>Dojo Helpdesk</h1>
                <Link href="/signup">Sign Up</Link>
                <Link href="/login">Log In</Link>
            </nav>
            {children}
            {/* Due to the nested layout, the global layout would apply to every page, and the children in the global layout would have the nested layout inside them, then the nested layouts in the auth and dashboards, would now have the rest of the page content as the the children prop
            
            the nested layouts would be output in the children of the main layout*/}

        </>
    );
}

export default AuthLayout;