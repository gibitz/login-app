import {redirect} from "next/navigation";
import { requireAdminUser } from "@/lib/auth/guard";

export default async function Home() {
    const admin = await requireAdminUser();

    if (!admin) redirect("/login");

    return <div className="pt-20">Home Page</div>;
}