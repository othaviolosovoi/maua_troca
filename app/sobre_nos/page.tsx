import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

export default function sobresos() {
    return (
        <div className="bg-customWhite min-h-screen pt-32"> {/* Ajuste do padding-top */}
            <Navbar />

            {/* Ícone de voltar */}
            <Link href="/" className="absolute top-20 left-4 text-customOrange hover:text-customBlue text-3xl">
                <IoArrowBack />
            </Link>

            <div className="mx-auto max-w-2xl px-6 py-8">
                <h1 className="text-3xl font-bold text-customBlue mb-4">O que é o Mauá Trocas?</h1>
                <p className="text-lg text-gray-700 mb-8">
                    O projeto "Mauá Trocas," desenvolvido pelos alunos do 3º ano de Ciência da Computação do Instituto Mauá de Tecnologia, tem como objetivo simplificar o processo de troca de salas entre os estudantes da universidade. A plataforma oferece uma interface intuitiva e interativa, facilitando a navegação e promovendo uma experiência amigável para o usuário. Através de um sistema de pareamento eficiente, os alunos podem encontrar colegas dispostos a realizar trocas, com base na sala atual, na sala desejada e no tempo em que o pedido foi feito. Esse método otimiza o processo de troca, oferecendo maior conveniência e agilidade.
                </p>
                
                <h2 className="text-2xl font-semibold text-customBlue mb-4">Tecnologias Utilizadas</h2>
                <p className="text-lg text-gray-700 mb-8">
                    Para o desenvolvimento deste projeto, foram utilizadas as seguintes tecnologias:
                    <br/><br/>
                    <strong>Back-end:</strong> Python, pela versatilidade e robustez no desenvolvimento de APIs e lógica de negócios.
                    <br/>
                    <strong>Front-end:</strong> Next.js, que contribui com a criação de interfaces dinâmicas e responsivas.
                    <br/>
                    <strong>Banco de Dados:</strong> PostgreSQL, escolhido pela capacidade de lidar com grandes volumes de dados e pela eficiência no gerenciamento de consultas complexas.
                    <br/><br/>
                    Além disso, contamos com bibliotecas e ferramentas que complementam a solução:
                    <br/>
                    <strong>Vercel</strong> para hospedagem e deploy contínuo da aplicação,
                    <strong>Tailwind CSS</strong> e <strong>shadcn/ui</strong> para estilização e design responsivo,
                    <strong>Next-Auth</strong> para a autenticação segura dos usuários, e
                    <strong>Prisma</strong> para interação com o banco de dados, simplificando consultas e gerando um mapeamento direto das tabelas para o código.
                </p>

                <p className="text-lg text-gray-700">
                    O projeto "Mauá Trocas" visa atender à demanda dos alunos de forma prática e moderna, substituindo o método informal atual e oferecendo uma plataforma confiável para facilitar as trocas de salas na faculdade.
                </p>
            </div>
        </div>
    );
}
