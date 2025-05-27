"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Importere Supabase og User-type
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import SolverktoyListe from "@/components/SolverktoyListe";
import SunTools from "@/components/SunTools";

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.push("/login"); // Brukeren er ikke logget inn
            } else {
                setUser(data.user);
            }
            setLoading(false);
        };
        getUser();
    }, [router]);

    if (loading) {
        return (
            <main className='flex items-center justify-center min-h-screen bg-yellow-50'>
                <p className='text-yellow-600 font-semibold'>
                    Laster solstrålene dine ...
                </p>
            </main>
        );
    }

    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-300 p-6'>
            <div className='bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center'>
                <h1 className='text-4xl font-bold text-yellow-600 mb-4'>
                    🌞 Velkommen til Solsiden Dashboard
                </h1>
                <p className='text-gray-700 mb-6'>
                    Du er logget inn som{" "}
                    <span className='font-semibold'>{user?.email}</span>
                </p>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        router.push("/");
                    }}
                    className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg'
                >
                    Logg ut
                </button>
            </div>
            <div className='mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold text-yellow-600 mt-6 text-center '>
                    🌞 Hvilke solverktøy klarer ikke du deg uten?
                </h1>
                <SunTools />
            </div>
            <SolverktoyListe />
            <button
                onClick={() => router.push("/")}
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg'
            >
                Jeg vil tilbake til Solsiden
            </button>
        </main>
    );
}
