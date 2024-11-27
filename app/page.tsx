import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import { buttonVariants } from "@/components/ui/button";
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="bg-customWhite min-h-screen pt-16"> 
      <Navbar />

      {/* Seção da 1ª imagem */}
      <section className="flex flex-col md:flex-row items-center justify-center p-8 space-y-8 md:space-y-0 md:space-x-20 mt-32">
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Encontre alguém para trocar de sala
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            O sistema que facilita a troca de salas do Instituto Mauá de Tecnologia. Por alunos para alunos!
          </p>
          <Link className={`${buttonVariants({ variant: "outline" })} bg-customOrange text-white hover:bg-customBlue mt-9 rounded-xl py-6 px-6`} href="/sobre_nos">
            Saiba mais
          </Link>
        </div>

        <div className="mt-4 md:mt-0">
          <Image
            src="/foto_inicio.jpg"
            alt="Campus Mauá"
            width={900}
            height={900}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Seção da 2ª imagem */}
      <section className="flex flex-col md:flex-row items-center justify-center p-20 space-y-8 md:space-y-0 md:space-x-20 mt-52">
        <div className="mt-4 md:mt-0 mb-4">
          <Image
            src="/alunos.png"
            alt="Alunos Mauá"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Por que usar?
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Nosso algoritmo permite que duas ou mais pessoas troquem de sala!
          </p>
          <p className="text-base text-gray-500 mb-4">
            Por exemplo, se existirem 3 salas com 3 pessoas, cada pessoa querendo ir em uma sala diferente, o algoritmo faz o match entre as três.
          </p>
        </div>
      </section>
    </div>
  );
}
