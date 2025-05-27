"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Solverktoy = {
    id: string;
    created_at: string;
    tool_1: string;
    tool_2: string;
    tool_3: string;
};

export default function SolverktoyListe() {
    const [items, setItems] = useState<Solverktoy[]>([]);

    useEffect(() => {
        const fetchTools = async () => {
            const { data, error } = await supabase
                .from("solverktoy")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Feil ved henting:", error.message);
            } else {
                setItems(data as Solverktoy[]);
            }
        };

        fetchTools();
    }, []);

    if (items.length === 0) {
        return (
            <p className='text-center text-gray-500 mt-6'>
                Ingen solverktøy er delt ennå ☁️
            </p>
        );
    }

    return (
        <section className='w-full max-w-2xl my-10'>
            <h2 className='text-4xl font-bold text-yellow-600 mb-4 text-center underline mt-6'>
                🔆 Allerede innlevert solverktøy
            </h2>
            <ul className='space-y-4'>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className='bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm'
                    >
                        <p className='text-yellow-700 font-semibold mb-1'>
                            Innlevert:{" "}
                            {new Date(item.created_at).toLocaleDateString()}
                        </p>
                        <ul className='list-disc list-inside text-gray-800'>
                            <li>{item.tool_1}</li>
                            <li>{item.tool_2}</li>
                            <li>{item.tool_3}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}
