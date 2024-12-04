import { PrismaGetInstance } from "@/lib/prisma-pg"; // Função para instanciar o Prisma Client
import { NextRequest, NextResponse } from "next/server";

interface Person {
  name: string;
  currentRoom: string;
  desiredRoom: string;
  email: string;
  year: number; // Adicionado o ano
}

type Connection = Person[];

function findAllConnections(people: Person[]): Connection[] {
  const connections: Connection[] = [];
  const visitedPairs = new Set<string>(); // Armazena combinações únicas de conexões

  for (const person1 of people) {
    for (const person2 of people) {
      if (
        person1.name !== person2.name &&
        person1.year === person2.year &&
        person1.desiredRoom === person2.currentRoom &&
        person2.desiredRoom === person1.currentRoom
      ) {
        // Gera uma chave única para a conexão
        const pairKey = [person1.name, person2.name].sort().join('-');

        if (!visitedPairs.has(pairKey)) {
          connections.push([person1, person2]);
          visitedPairs.add(pairKey); // Marca como visitado
        }
      }

      // Conexões de 3 pessoas
      for (const person3 of people) {
        if (
          person1.name !== person2.name &&
          person2.name !== person3.name &&
          person1.name !== person3.name &&
          person1.year === person2.year &&
          person2.year === person3.year &&
          person1.desiredRoom === person2.currentRoom &&
          person2.desiredRoom === person3.currentRoom &&
          person3.desiredRoom === person1.currentRoom
        ) {
          // Gera uma chave única para a conexão
          const tripletKey = [person1.name, person2.name, person3.name]
            .sort()
            .join('-');

          if (!visitedPairs.has(tripletKey)) {
            connections.push([person1, person2, person3]);
            visitedPairs.add(tripletKey); // Marca como visitado
          }
        }
      }
    }
  }

  return connections;
}


// Endpoint principal
export async function GET() {
  try {
    const prisma = PrismaGetInstance(); // Obtenha a instância do Prisma
    const users = await prisma.user.findMany({
      select: {
        name: true,
        currentRoom: true,
        desiredRoom: true,
        email: true,
        year: true, // Adicionado o campo "year"
      },
    });

    // Transformando os dados para o formato esperado pela função
    const filteredUsers: Person[] = users.map(user => ({
      name: user.name,
      currentRoom: user.currentRoom,
      desiredRoom: user.desiredRoom,
      email: user.email,
      year: user.year,
    }));

    // Se nenhum usuário for encontrado, retorne uma mensagem apropriada
    if (!filteredUsers || filteredUsers.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // Encontrando todas as cadeias de troca
    const chains = findAllConnections(filteredUsers);

    // Retornando as cadeias de troca
    if (chains.length > 0) {
      console.log(chains)
      return NextResponse.json(chains, { status: 200 });
    } else {
      return NextResponse.json({ message: "No swap chains found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
