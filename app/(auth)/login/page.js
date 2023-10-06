"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

//Functions cannot be passed as porps from server to client components. Anythin that's not serizable, like functions dates or dom elements. Boolean strings can go though.


const Login = () => {

    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e, email, password) => {
        e.preventDefault()
        setError('')

        // console.log(email, password)
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) {
            setError(error.message)
        }
        if (!error) {
            router.push('/')
        }
    }
    []
    return (
        <main>
            <h2 className="text-center">Login</h2>

            <AuthForm handleSubmit={handleSubmit} />

            {error && (
                <div className="error">
                    {error}
                </div>
            )}
        </main>
    )
}

export default Login;

