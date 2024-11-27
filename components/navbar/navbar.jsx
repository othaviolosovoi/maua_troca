import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from 'react-icons/gi';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';

export default function Navbar() {
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full flex items-center justify-between h-13 py-4 px-6 shadow-md border-b border-gray-200 bg-customWhite z-10'>
                <Image src="/logo.png" width={100} height={200} alt="logo mauatroca" />
                
                {/* Botão que aparece apenas em dispositivos móveis
                <div className="md:hidden fixed top-3 right-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <GiHamburgerMenu className="h-6 w-6 mt-2 text-customOrange  hover:text-customBlue" />
                        </SheetTrigger>
                        <SheetContent className=" bg-customWhite">
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div> */}
                
                {/* Botão que aparece apenas em telas maiores */}
                <div>
                <Link className={`${buttonVariants({ variant: "outline" })} bg-customOrange text-white hover:bg-customBlue mt-2 rounded-xl px-4 py-5`} href="/login" >Trocar de Sala</Link>
                </div>
            </nav>
        </div>
    );
}