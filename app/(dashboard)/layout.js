import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";


const DashboardLayout = async ({ children }) => {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession() //to get us the current session and extract the data property that has the user in it.

    if (!data.session) {
        redirect('./login')
    }
    //Route protecing the dashboard, so if they try to get to any page with the navbar of the dashboard, then it'd redirect to login page

    return (
        <>
            <Navbar user={data.session.user} />
            {children}
        </>
    );
}

export default DashboardLayout;