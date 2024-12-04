"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

//! Interfaces
interface Chain {
    participants: Participant[]; // Atualizado para refletir a nova estrutura
}

interface Participant {
    name: string;
    currentRoom: string;
    desiredRoom: string;
    email: string;
    year: number;
}

interface User {
    id: string;
    name: string;
    email: string;
    year: number;
    currentRoom: string;
    desiredRoom: string;
}

export default function Home() {
    const [user, setUser] = useState < User | null > (null);
    const [chains, setChains] = useState<Chain[]>([]);
    const [matchedChains, setMatchedChains] = useState<Chain[]>([]);
    const [error, setError] = useState < string | null > (null);
    const [isLoading, setIsLoading] = useState(true);

    const MandaEmail = async () => {
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

    // Função para buscar os dados
    const fetchData = async () => {
        try {
            // Busca os dados do usuário
            const userResponse = await axios.get<User>("/api/user");
            setUser(userResponse.data);

            // Busca as cadeias de troca
            const chainsResponse = await axios.get<Chain[]>("/api/troca");
            const chainsData = chainsResponse.data;

            // Valida se chainsData é um array válido
            if (!Array.isArray(chainsData)) {
                throw new Error("Formato inesperado na resposta do servidor.");
            }

            // Filtra cadeias compatíveis com o currentRoom e desiredRoom do usuário
            const matches = chainsData.filter(
                (chain) => chain.some((participant) => participant.currentRoom === userResponse.data.currentRoom && participant.desiredRoom === userResponse.data.desiredRoom)
            );

            setChains(chainsData);
            setMatchedChains(matches);
            setError(null);
        } catch (err : any) {
            console.error("Erro ao buscar dados:", err.message || err);
            setError("Falha ao carregar as informações.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Exibe mensagem enquanto os dados são carregados
    if (isLoading) {
        return <p> Carregando ...</p>;
    }

    // Exibe mensagem de erro, se ocorrer
    if (error) {
        return < p className = "text-red-500" > {
            error
        }</p>;
    }

    return (
    <div className="bg-customWhite min-h-screen pt-16">
        {/* Navbar */}
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
      
        {/* Main Content */}
        <div className="container mx-auto px-4 mt-24">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Bem-vindo(a), {user?.name}!
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            {/* Informações do Usuário */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Suas informações de troca:</h2>
              <p className="text-gray-700">
                <strong>Sala Atual:</strong> {user?.currentRoom}
              </p>
              <p className="text-gray-700">
                <strong>Sala Desejada:</strong> {user?.desiredRoom}
              </p>
            </div>
      
            {/* Cadeias de Troca Compatíveis */}
            <h2 className="text-lg font-medium mb-4">Cadeias de Troca Compatíveis</h2>
            {chains.length > 0 ? (
              chains.map((chain, index) => {
                const filteredChain = chain.filter(
                  (participant) => participant.name !== user?.name
                );
      
                if (filteredChain.length > 0) {
                  return (
                    <div
                      key={index}
                      className="border-b border-gray-300 py-4 mb-4 last:border-b-0"
                    >
                      <h3 className="text-sm font-medium mb-2">Cadeia {index + 1}:</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        {filteredChain.map((participant, idx) => (
                          <li key={idx}>
                            <strong>{participant.name}</strong> ({participant.email}) -{" "}
                            {participant.currentRoom} → {participant.desiredRoom}
                            <Button onClick={MandaEmail} className="mt-4">
                                Confimar Troca
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
              })
            ) : (
              <p className="text-gray-600">Nenhuma cadeia compatível encontrada.</p>
            )}
          </div>
        </div>
      </div>)
}
