import {redirect} from "next/navigation";
import { requireAdminUser } from "@/lib/auth-check";

export default async function Home() {
    const user = await requireAdminUser();

    if (!user) redirect("/login");

    return <div className="pt-20">Home Page</div>;
}