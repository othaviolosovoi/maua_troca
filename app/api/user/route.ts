import { PrismaGetInstance } from "@/lib/prisma-pg";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const authCookie = (await cookies()).get("auth-session");
    const sessionToken = authCookie?.value || "";
    const prisma = PrismaGetInstance();

    // Verifica se a sessão é válida
    const session = await prisma.sessions.findFirst({
        where: {
            token: sessionToken,
            valid: true,
        },
    });

    if (!session || session.expiresAt < new Date()) {
        return NextResponse.json({ error: "Sessão inválida ou expirada." }, { status: 401 });
    }

    // Busca os dados do usuário com base no ID da sessão
    
    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            year: true,
            currentRoom: true,
            desiredRoom: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    // Retorna os dados do usuário
    return NextResponse.json(user, { status: 200 });
}
