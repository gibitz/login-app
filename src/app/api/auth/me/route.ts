import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/guard";

export async function GET() {
    const user = await getAuthenticatedUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json({ user });
}