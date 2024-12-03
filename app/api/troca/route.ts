import { PrismaGetInstance } from "@/lib/prisma-pg"; // Função para instanciar o Prisma Client
import { NextRequest, NextResponse } from "next/server";

// Função para construir o grafo
function buildGraph(users: { currentRoom: string; desiredRoom: string; name: string }[]) {
  const graph: Record<string, { neighbor: string; user: { name: string; currentRoom: string } }[]> = {};

  users.forEach(user => {
    if (!graph[user.currentRoom]) {
      graph[user.currentRoom] = [];
    }
    graph[user.currentRoom].push({
      neighbor: user.desiredRoom,
      user: { name: user.name, currentRoom: user.currentRoom },
    });
  });

  return graph;
}



// export default async function handler(req: NextRequest, res: NextResponse) {
//     const headers = req.headers;
//     const trocaData = await fetch(`${process.env.API_URL}/troca`, {
//         headers: headers, // Repassa os headers recebidos
//     });
//     const data = await trocaData.json();
//     res.status(200).json(data);
// }

// Função para encontrar ciclos (cadeias de trocas) no grafo
function findSwapChains(graph: Record<string, { neighbor: string; user: { name: string; currentRoom: string } }[]>) {
  const visited = new Set<string>();
  const chains: { chain: string[] }[] = [];

  // Função auxiliar para busca em profundidade
  function dfs(current: string, path: string[], start: string) {
    if (visited.has(current)) return;

    visited.add(current);
    path.push(current);

    const neighbors = graph[current] || [];
    for (const { neighbor, user } of neighbors) {
      if (neighbor === start) {
        // Fechou um ciclo, adiciona ao resultado
        chains.push({
          chain: [...path.map(node => `${graph[node]?.[0]?.user.name || node} (Sala ${node})`), `${user.name} (Sala ${neighbor})`],
        });
        continue;
      }
      dfs(neighbor, [...path], start);
    }

    visited.delete(current);
  }

  // Inicia busca de ciclos para cada nó
  Object.keys(graph).forEach(node => {
    dfs(node, [], node);
  });

  return chains;
}

// Endpoint principal
export async function GET() {
  try {
    const prisma = PrismaGetInstance(); // Obtenha a instância do Prisma
    const users = await prisma.user.findMany();

    // Transformando para retornar apenas os campos desejados
    const filteredUsers = users.map(user => ({
      name: user.name,
      currentRoom: user.currentRoom,
      desiredRoom: user.desiredRoom,
    }));

    // Se nenhum usuário for encontrado, retorne uma mensagem apropriada
    if (!filteredUsers || filteredUsers.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // Construindo o grafo a partir dos usuários
    const graph = buildGraph(filteredUsers);

    // Encontrando todas as cadeias de trocas
    const chains = findSwapChains(graph);

    // Retornando as cadeias de troca
    if (chains.length > 0) {
      return NextResponse.json(chains, { status: 200 });
    } else {
      return NextResponse.json({ message: "No swap chains found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}