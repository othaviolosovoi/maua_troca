'use client'
import { useEffect, useState } from "react";

const ExamplePage = () => {
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/python");
                if (!response.ok) {
                    throw new Error();
                }
                const data = await response.json();
                setResult(data.result);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Resultado do Script Python</h1>
            {result && <p>Resultado: {result}</p>}
            {error && <p>Erro: {error}</p>}
        </div>
    );
};

export default ExamplePage;