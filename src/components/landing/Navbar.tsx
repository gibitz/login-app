import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed flex w-full bg-card/90 backdrop-blur-sm py-4 px-6 shadow-md z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={50} height={50} className=""/>
                    <span className="font-semibold text-lg">LoginApp</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/register">
                        <button
                        type="submit"
                        className=" text-primary-foreground font-semibold px-4 py-3 rounded-lg"
                    >
                        Registrar
                    </button>
                    </Link>
                    <Link href="/login">
                        <button
                            type="submit"
                            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg"
                        >
                            Entrar
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
