"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
    const [message, setMessage] = useState("Verifiserer e-post...");
    const router = useRouter();

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const queryString = new URLSearchParams(hash.substring(1));
            const access_token = queryString.get("access_token");
            const refresh_token = queryString.get("refresh_token");

            if (access_token && refresh_token) {
                supabase.auth
                    .setSession({ access_token, refresh_token })
                    .then(() => {
                        setMessage(
                            "E-posten er bekreftet! Du sendes videre..."
                        );
                        setTimeout(() => {
                            router.push("/dashboard");
                        }, 2000);
                    })
                    .catch(() => {
                        setMessage("Noe gikk galt ved verifisering.");
                    });
            } else {
                setMessage("Ugyldig verifiseringslenke.");
            }
        } else {
            setMessage("Ingen bekreftelsesdata funnet i URL.");
        }
    }, [router]);

    return (
        <main className='flex items-center justify-center min-h-screen bg-yellow-50'>
            <p className='text-yellow-600 font-semibold text-center'>
                {message}
            </p>
        </main>
    );
}
