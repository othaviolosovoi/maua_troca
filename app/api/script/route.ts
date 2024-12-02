import { PrismaGetInstance } from "@/lib/prisma-pg"
import { NextResponse } from "next/server"

interface UserScriptProps{
    email: string,
    salaAtual: string,
    salaDesejada: string
}

export interface UserScriptResponse{
    session: string;
}

export async function POST(request: Request) {
    const body = await request.json() as UserScriptProps

    const { email, salaAtual, salaDesejada } = body

    try {
        const prisma = PrismaGetInstance()
        
        const user = await prisma.user.findMany({
            orderBy: [
                {  
                    email: 'asc',
                }
            ]
        })

    } catch (error) {
        return NextResponse.json<UserScriptResponse>({ session: "Sei la essa porra" }, { status: 400 })
    }
}