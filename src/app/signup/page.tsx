"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            router.push("/");
        }
    };

    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6'>
            <div className='bg-white p-8 rounded-xl shadow-xl max-w-md w-full'>
                <h1 className='text-3xl font-bold text-center text-yellow-600 mb-6'>
                    Opprett bruker ☀️
                </h1>
                <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        placeholder='E-post'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='border border-orange-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />
                    <input
                        type='password'
                        placeholder='Passord'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='border border-orange-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />

                    {errorMsg && (
                        <p className='text-red-600 text-sm'>{errorMsg}</p>
                    )}

                    <button
                        type='submit'
                        className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition'
                        disabled={loading}
                    >
                        {loading ? "Oppretter..." : "Opprett bruker"}
                    </button>
                </form>
            </div>
        </main>
    );
}
