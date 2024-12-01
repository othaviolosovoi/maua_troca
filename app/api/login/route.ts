import { PrismaGetInstance } from "@/lib/prisma-pg"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"

interface LoginProps{
    email: string,
    password: string
}

export interface LoginResponse{
    session: string;
}

export async function POST(request: Request) {
    const body = await request.json() as LoginProps

    const { email, password } = body

    if (!email || !password) {
        return NextResponse.json<LoginResponse>({ session: "" }, { status: 200 })
    }

    try {
        const prisma = PrismaGetInstance()
        
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email, 
            }
        })

        if (user.password !== password) {
            return NextResponse.json<LoginResponse>({ session: "" }, { status: 200 })
        }

        return NextResponse.json<LoginResponse>({ session: "authenticated" }, { status: 200 })

    } catch (error) {
        return NextResponse.json<LoginResponse>({ session: "" }, { status: 200 })
    }
}