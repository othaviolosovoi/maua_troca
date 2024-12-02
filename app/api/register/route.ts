import { PrismaGetInstance } from "@/lib/prisma-pg"
import { User } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

interface RegisterProps{
    registerName: string
    registerEmail: string
    registerPassword: string
    registerYear: string
    currentRoom: string
    desiredRoom: string
}

export interface RegisterResponse{
    error?: string;
    user?: User
}

export async function POST(request: Request) {
    const body = await request.json() as RegisterProps
    const { registerName, registerEmail, registerPassword, registerYear, currentRoom, desiredRoom } = body

    // if (!isMauaEmail || !registerPassword || !registerName || !currentRoom || !desiredRoom) {
    //     return NextResponse.json({ error: "Server Error" }, { status: 500 })
    // }
    //console.log("Dados recebidos function:", { registerName, registerEmail, registerPassword, currentRoom, desiredRoom });

    const hash = bcrypt.hashSync(registerPassword, 12);

    const prisma = PrismaGetInstance()

    const user = await prisma.user.create({
        data: {
            name: registerName,
            email: registerEmail,
            password: hash,
            currentRoom,
            desiredRoom,
        }
    });



    return NextResponse.json({ user }, { status: 200 })
}