import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background backdrop-blur-md h-16">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="https://thumbs.dreamstime.com/b/imagem-transparente-ou-png-de-um-emoji-surpreendido-376439721.jpg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="w-11"
                    />
                    <span className="font-semibold text-lg">LoginApp</span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/register">
                        <Button size={"sm"}>Registrar</Button>
                    </Link>
                    <Link href="/login">
                        <Button variant={"ghost"} size={"sm"}>
                            Entrar
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
