import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const AuthLayout = async ({ children }) => {

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession() //to get us the current session and extract the data property that has the user in it.

    if (data.session) {
        redirect('/')
    }
    //Route protecing the login page, so if they are already logged in and somehow get there, then they'd get yeeted back to the dashboard 

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