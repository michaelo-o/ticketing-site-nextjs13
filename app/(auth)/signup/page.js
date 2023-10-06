"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"  //Function that connects to supabase so one can sign up, sign out etc., and interact with a database if there's one.
import AuthForm from "../AuthForm";

//supabase auth uses cookie to transfer auth information between browser and supabase.
//the createClientComponentClient is meant for use in the browser and access that in the browser

const Signup = () => {

    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async (e, email, password) => {
        e.preventDefault()
        setError('')

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback` //Location.origin is to whatever the origin of the page, the website's link is
                //to verify email. It redirects them to the application, to an API callback route where we can handle the redirect and get access to a special codein the request url. then we can send that code to supabase to inform of the verification and exchange it for a session. After it redirects back to the dashboard with the user login
            }
        })
        if (error) {
            setError(error.message)  //stringifies it since the error is originally an object
        }
        if (!error) {
            router.push('/verify')
        }
    }

    return (
        <main>
            <h2 className="text-center">Sign up</h2>

            <AuthForm handleSubmit={handleSubmit} />

            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}

export default Signup;

