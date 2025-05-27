"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6'>
            <h1 className='text-5xl font-extrabold text-moss-600 mb-4'>
                Velkommen til Solsiden ☀️
            </h1>

            <p className='text-lg text-moss-500 text-center max-w-xl mb-8'>
                Her skinner alltid solen – men bare for innloggede brukere. Logg
                inn, og få tilgang til våre solfylte tjenester!
            </p>

            {user ? (
                <div className='text-center flex flex-col items-center gap-4'>
                    <p className='text-green-700 font-semibold'>
                        Du er logget inn som {user.email} 🌞
                    </p>

                    <a
                        href='/dashboard'
                        className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition'
                    >
                        Gå til Dashboard
                    </a>

                    <button
                        className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg'
                        onClick={async () => {
                            await supabase.auth.signOut();
                            location.reload();
                        }}
                    >
                        Logg ut
                    </button>
                </div>
            ) : (
                <div className='flex gap-4'>
                    <Link
                        href='/signup'
                        className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg'
                    >
                        Opprett bruker
                    </Link>
                    <Link
                        href='/login'
                        className='bg-white border border-yellow-500 text-yellow-600 px-6 py-2 rounded-lg hover:bg-yellow-100'
                    >
                        Logg inn
                    </Link>
                </div>
            )}
        </main>
    );
}
