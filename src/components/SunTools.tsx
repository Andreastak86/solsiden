"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SunTools() {
    const [tool1, setTool1] = useState("");
    const [tool2, setTool2] = useState("");
    const [tool3, setTool3] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from("solverktoy").insert([
            {
                tool_1: tool1,
                tool_2: tool2,
                tool_3: tool3,
            },
        ]);

        if (error) {
            console.error("Feil ved innsending:", error.message);
        } else {
            setSubmitted(true);
        }
    };

    return (
        <main className=' my-8 flex items-center justify-center bg-orange-50 p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-yellow-600'>
                    Dine 3 sol-verktøy 🔆
                </h1>
                {submitted ? (
                    <p className='text-green-600 font-semibold'>
                        Takk for bidraget! 😎
                    </p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-3'
                    >
                        <input
                            value={tool1}
                            onChange={(e) => setTool1(e.target.value)}
                            placeholder='Verktøy 1'
                            className='border rounded px-3 py-2'
                            required
                        />
                        <input
                            value={tool2}
                            onChange={(e) => setTool2(e.target.value)}
                            placeholder='Verktøy 2'
                            className='border rounded px-3 py-2'
                            required
                        />
                        <input
                            value={tool3}
                            onChange={(e) => setTool3(e.target.value)}
                            placeholder='Verktøy 3'
                            className='border rounded px-3 py-2'
                            required
                        />
                        <button
                            type='submit'
                            className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mt-2'
                        >
                            Send inn
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
