'use client';  
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa'; 

export default function Troca() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);  // Estado para controle da autenticação
  const router = useRouter();  // Para navegação

  const troca = {
    nome: "João Silva",
    email: "joao.silva@example.com",
    salaOriginal: "3/5/2",
  };

  // Verificação de autenticação no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authenticated = localStorage.getItem("authenticated");
      if (!authenticated) {
        // Se não estiver autenticado, redireciona para login
        router.push("/login");
      } else {
        setIsAuthenticated(true);  // Atualiza o estado de autenticação
      }
    }
  }, [router]); // Executa uma vez quando o componente é montado no cliente

  // Enquanto a verificação de autenticação não é feita, exibe um loading
  if (isAuthenticated === null) {
    return <p>Loading...</p>;  // Exibe algo enquanto verifica a autenticação
  }

  // Se não estiver autenticado, já terá redirecionado, então o conteúdo é exibido após a autenticação ser validada
  if (!isAuthenticated) {
    return null;  // Não renderiza nada se não estiver autenticado (isso deve acontecer devido ao redirecionamento)
  }

  return (
    <div className="bg-customWhite min-h-screen pt-16">
      <div>
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-13 py-4 px-6 shadow-md border-b border-gray-200 bg-customWhite z-10">
          <Image src="/logo.png" width={100} height={200} alt="logo mauatroca" />
          <Link href="/" className="flex items-center text-xl font-semibold text-customOrange hover:text-customBlue">
            <FaSignOutAlt size={25} className="mr-2" /> {/* Ícone de saída */}
          </Link>
        </nav>
      </div>
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-2xl font-semibold text-center mb-6">Informações de Troca de Sala</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Nome</h2>
            <p className="text-sm text-gray-700">{troca.nome}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">E-mail</h2>
            <p className="text-sm text-gray-700">{troca.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Sala Original</h2>
            <p className="text-sm text-gray-700">{troca.salaOriginal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
