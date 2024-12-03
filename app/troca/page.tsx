'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

interface Chain {
  chain: string[]; // Cada "chain" é um array de strings representando a sequência de trocas
}

export default function Troca() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const [chains, setChains] = useState<Chain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as cadeias de troca
  const fetchChains = async () => {
    try {
      const response = await axios.get<Chain[]>("/api/troca"); // Chama sua API Python
      setChains(response.data); // Atualiza o estado com as cadeias de troca
      setError(null);
    } catch (err: any) {
      console.error("Erro ao buscar cadeias:", err.message);
      setError("Falha ao carregar as cadeias de troca.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authenticated = localStorage.getItem("authenticated");
      if (!authenticated) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
        fetchChains(); // Carrega as cadeias de troca ao montar o componente
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-customWhite min-h-screen pt-16">
      <div>
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-13 py-4 px-6 shadow-md border-b border-gray-200 bg-customWhite z-10">
          <Image src="/logo.png" width={100} height={200} alt="logo mauatroca" />
          <Link
            href="/"
            className="flex items-center text-xl font-semibold text-customOrange hover:text-customBlue"
          >
            <FaSignOutAlt size={25} className="mr-2" />
          </Link>
        </nav>
      </div>
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Cadeias de Troca de Sala
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-lg font-medium mb-4">Cadeias Encontradas</h2>
          {isLoading ? (
            <p>Carregando cadeias...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : chains.length > 0 ? (
            chains.map((chain, index) => (
              <div key={index} className="border-b border-gray-300 py-2">
                <h3 className="text-sm font-medium mb-2">Cadeia {index + 1}:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {chain.chain.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Nenhuma cadeia encontrada.</p>
          )}
        </div>
        <Button onClick={fetchChains} className="mt-4">
          Atualizar Cadeias
        </Button>
      </div>
    </div>
  );
}
