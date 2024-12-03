import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;

    // Se o token não estiver presente, redireciona para /login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Adiciona o cabeçalho de autenticação para a próxima requisição
    const headers = new Headers(req.headers);
    headers.set("Authorization", `Bearer ${token}`);

    // Cria uma nova resposta com os headers atualizados
    return NextResponse.next({
        request: {
            headers,
        },
    });
}

// Define quais rotas serão protegidas pelo middleware
export const config = {
    matcher: ["/", "/api/troca"], // Rotas protegidas
};
