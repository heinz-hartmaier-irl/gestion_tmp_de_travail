import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Déconnecté" });
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0, // supprime le cookie
  });
  return response;
}
