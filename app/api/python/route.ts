import { NextResponse } from "next/server";
import { exec } from "child_process";

export const runPythonScript = async (args: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`python troca.py ${args.join(" ")}`, (error, stdout, stderr) => {
            if (error) {
                return reject(`Erro ao executar o script Python: ${stderr}`);
            }
            resolve(stdout.trim());
        });
    });
};

// Método HTTP GET para a rota
export async function GET() {
    try {
        const args = ["5", "10"]; // Exemplos de argumentos
        const result = await runPythonScript(args); // Chama o script Python
        return NextResponse.json({ result }); // Retorna o resultado como JSON
    } catch (error) {
        console.error("Erro no servidor:", error); // Log detalhado do erro no terminal
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
