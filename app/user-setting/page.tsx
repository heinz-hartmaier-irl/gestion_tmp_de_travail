"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id_user: number;
  nom: string;
  prenom: string;
  poste: string;
  mail: string;
  solde_conge: number;
  solde_hsup: number;
  derniere_demande?: string | null;
  statut_derniere_demande?: string | null;
}

export default function UserSettingPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user-setting", { credentials: "include" });
        const data = await res.json();
        

        if (res.ok && data.success) {
          setUsers(data.users);
        } else {
          console.error("Erreur chargement :", data.error);
        }
      } catch (err) {
        console.error("Erreur fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

const handleUpdate = async (userId: number, field: "solde_hsup" | "solde_conge") => {
  const value = prompt(`Nouvelle valeur pour ${field.replace("_", " ")} :`);
  if (value === null) return;

  const numberValue = parseInt(value);
  if (isNaN(numberValue)) return alert("Valeur invalide");

  try {
    const res = await fetch(`/api/user-setting/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: numberValue }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id_user === userId ? { ...u, [field]: numberValue } : u))
      );
      alert("Modification enregistrée !");
    } else {
      alert(data.error || "Erreur lors de la mise à jour");
    }
  } catch (err) {
    console.error("Erreur update:", err);
    alert("Erreur serveur");
  }
};


  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-[#000091] mb-8 text-center">
        Tableau de bord RH / Admin
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-indigo-900 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Nom</th>
              <th className="border px-4 py-2 text-left">Prénom</th>
              <th className="border px-4 py-2 text-left">Poste</th>
              <th className="border px-4 py-2 text-center">Heures supp</th>
              <th className="border px-4 py-2 text-center">Congés restants</th>
              <th className="border px-4 py-2 text-center">Dernière demande</th>
              <th className="border px-4 py-2 text-center">Statut</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id_user} className="bg-indigo-500">
                <td className="border px-4 py-2">{u.nom}</td>
                <td className="border px-4 py-2">{u.prenom}</td>
                <td className="border px-4 py-2">{u.poste}</td>
                <td className="border px-4 py-2 text-center">
                  {u.solde_hsup}h
                  <Button className="ml-2 text-sm" onClick={() => handleUpdate(u.id_user, "solde_hsup")}>
                    Modifier
                  </Button>
                </td>
                <td className="border px-4 py-2 text-center">
                  {u.solde_conge} jours
                  <Button className="ml-2 text-sm" onClick={() => handleUpdate(u.id_user, "solde_conge")}>
                    Modifier
                  </Button>
                </td>
                <td className="border px-4 py-2 text-center">
                  {u.derniere_demande ? new Date(u.derniere_demande).toLocaleDateString() : "—"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {u.statut_derniere_demande || "—"}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Button
                    variant="outline"
                    className="text-[#000091]"
                    onClick={() =>
                      alert(`${u.nom} ${u.prenom}\nPoste: ${u.poste}\nMail: ${u.mail}`)
                    }
                  >
                    Détails
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
