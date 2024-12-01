
/* PRA QUEM FOR USAR: como o banco não tá implementado, no login use: Nome: admin, Senha: admin12345*/
'use client'
import * as React from "react"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { IoArrowBack } from 'react-icons/io5'
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios, { AxiosError } from 'axios'
import { RegisterResponse } from "../api/register/route"


export default function Login() {
    const [loginName, setLoginName] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [registerName, setRegisterName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [currentRoom, setCurrentRoom] = useState("")
    const [desiredRoom, setDesiredRoom] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const router = useRouter()

    
    const handleLogin = () => {
        if (loginName === "admin" && loginPassword === "admin12345") {
            localStorage.setItem("authenticated", "true");
            router.push("/troca");
        } else {
            alert("Credenciais inválidas");
        }
    }

    // const handleRegister = () => {
    //     const isMauaEmail = registerEmail.endsWith("@maua.br")
        
    //     if (registerName && isMauaEmail && registerPassword && currentRoom.length === 3 && desiredRoom.length === 3) {
    //         setIsRegistered(true)
    //         setTimeout(() => setIsRegistered(false), 2000)
    //     } else {
    //         alert("Por favor, preencha todos os campos corretamente.")
    //     }
    // }

    const handleRegister = async() => {
        const isMauaEmail = registerEmail.endsWith("@maua.br")
        // if (registerName && isMauaEmail && registerPassword && currentRoom.length === 3 && desiredRoom.length === 3) {
            try{
                const response = await axios.post<RegisterResponse>("/api/register", {
                    registerName,
                    registerEmail,
                    registerPassword,
                    currentRoom,
                    desiredRoom,
                })
                console.log("Dados recebidos :", { registerName, registerEmail, registerPassword, currentRoom, desiredRoom });
                setIsRegistered(true)
                setTimeout(() => setIsRegistered(false), 2000)
            }
            catch(error) {
                if(error instanceof AxiosError) {
                    console.log(error.message)
                }
            }
        // } else {
        //     alert("Por favor, preencha todos os campos corretamente.")
        // }
    }





    return (
        <main className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-cover b g-center bg-no-repeat" style={{ backgroundImage: "url('/foto_login.jpg')", filter: "blur(8px)", zIndex: -1 }} />
            <Link href="/" className="absolute top-4 left-4 text-customOrange hover:text-customBlue text-3xl">
                <IoArrowBack />
            </Link>

            <div className="w-[400px] p-6 ">
                <Tabs defaultValue="login" className="w-full border-none shadow-none ">
                    <TabsList className="grid w-full grid-cols-2 border-none bg-customWhite">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="cadastrar-se">Cadastrar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card className="bg-customWhite">
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>Realize seu login</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="login-name">Nome</Label>
                                    <Input id="login-name" placeholder="Seu nome" className="placeholder-gray-400 bg-white" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="login-password">Senha</Label>
                                    <Input id="login-password" placeholder="Sua Senha" className="placeholder-gray-400 bg-white" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={`${buttonVariants({ variant: "outline" })} bg-customOrange text-white hover:bg-customBlue mt-7 rounded-xl`} onClick={handleLogin}>
                                    Entrar
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="cadastrar-se">
                        <Card className="bg-customWhite">
                            <CardHeader>
                                <CardTitle>Cadastrar-se</CardTitle>
                                <CardDescription>Realize seu cadastro aqui</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="register-name">Nome</Label>
                                    <Input id="register-name" placeholder="Seu nome" className="placeholder-gray-400 bg-white" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="register-email">Email</Label>
                                    <Input id="register-email" placeholder="Seu email" className="placeholder-gray-400 bg-white" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="register-password">Senha</Label>
                                    <Input id="register-password" placeholder="Sua Senha" className="placeholder-gray-400 bg-white" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label>Sala atual</Label>
                                    <InputOTP maxLength={3} pattern={REGEXP_ONLY_DIGITS} value={currentRoom} onChange={setCurrentRoom}>
                                        <InputOTPGroup>
                                            <InputOTPSlot className="bg-white" index={0} />
                                            <InputOTPSlot className="bg-white" index={1} />
                                            <InputOTPSlot className="bg-white" index={2} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <div className="space-y-1">
                                    <Label>Sala desejada</Label>
                                    <InputOTP maxLength={3} pattern={REGEXP_ONLY_DIGITS} value={desiredRoom} onChange={setDesiredRoom}>
                                        <InputOTPGroup>
                                            <InputOTPSlot className="bg-white" index={0} />
                                            <InputOTPSlot className="bg-white" index={1} />
                                            <InputOTPSlot className="bg-white" index={2} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={`${buttonVariants({ variant: "outline" })} bg-customOrange text-white hover:bg-customBlue mt-7 rounded-xl`} onClick={handleRegister}>
                                    Realizar cadastro
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {isRegistered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p>Registro concluído com sucesso!</p>
                    </div>
                </div>
            )}
        </main>
    );
}
