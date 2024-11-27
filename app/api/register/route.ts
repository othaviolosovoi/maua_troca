import { NextResponse } from "next/server"

interface RegisterProps{
    name: string
    email: string
    password: string
    currentRoom: string
    desiredRoom: string
}

export async function POST(request: Request) {
    const body = await request.json() as RegisterProps
    const { name, email, password, currentRoom, desiredRoom } = body

    if (!email || !password || !name || !currentRoom || !desiredRoom) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 })
    }
}