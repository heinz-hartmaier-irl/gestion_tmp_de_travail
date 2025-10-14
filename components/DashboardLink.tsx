// components/DashboardLink.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLink() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profil", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRole(data.user?.poste || null))
      .catch(console.error);
  }, []);

  if (!role) return null;

  return <Link href={role === "admin" ? "/dashboard-admin" : "/dashboard-user"}>Tableau de bord</Link>;
}
