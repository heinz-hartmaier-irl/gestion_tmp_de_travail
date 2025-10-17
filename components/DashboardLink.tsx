// components/DashboardLink.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLink() {
  const [role, setRole] = useState<string | null>(null);

      useEffect(() => {
        fetch("/api/profil", { credentials: "include" })
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              setRole(data.user.poste);
            } else {
              console.warn("Utilisateur non récupéré :", data);
              setRole(null);
            }
          })
          .catch(console.error);
      }, []);
        if (!role) return null;

  return (
    <div>
      <Link href={role === "admin" || role ==="RH" ? "/dashboard-admin" : "/dashboard-user"}>
        Tableau de bord
      </Link>

      {(role === "admin" || role === "RH") && (
        <div style={{ marginTop: "0.5rem" }}>
          <Link href="/user-setting">Gestion des utilisateurs</Link>
        </div>
      )}
    </div>
  );
}
