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
}

interface UserHistory {
  message: string;
  date: string;
}

export default function UserSettingPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [userHistory, setUserHistory] = useState<Record<number, UserHistory[]>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user-setting", { credentials: "include" });
        const data = await res.json();
        if (res.ok && data.success) {
          const uniqueUsersMap: Record<number, User> = {};
          data.users.forEach((u: User) => {
            if (!uniqueUsersMap[u.id_user]) uniqueUsersMap[u.id_user] = u;
          });
          setUsers(Object.values(uniqueUsersMap));

          if (data.history) setUserHistory(data.history);
        }
      } catch (err) {
        console.error("Erreur fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateField = async (userId: number, field: "solde_hsup" | "solde_conge") => {
    const value = prompt(`Nouvelle valeur pour ${field.replace("_", " ")} :`);
    if (!value) return;

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
        setUsers(prev => prev.map(u => u.id_user === userId ? { ...u, [field]: numberValue } : u));

        const logMessage = `Admin a modifié ${field.replace("_", " ")} de l'utilisateur le ${new Date().toLocaleDateString()}`;
        setUserHistory(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), { message: logMessage, date: new Date().toISOString() }],
        }));
      } else {
        alert(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };


  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      poste: user.poste,
      mail: user.mail,
      solde_hsup: user.solde_hsup,
      solde_conge: user.solde_conge,
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/user-setting/${editingUser.id_user}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u.id_user === editingUser.id_user ? { ...u, ...formData } : u));
        const logMessage = `Admin a modifié les infos de ${editingUser.nom} le ${new Date().toLocaleDateString()}`;
        setUserHistory(prev => ({
          ...prev,
          [editingUser.id_user]: [...(prev[editingUser.id_user] || []), { message: logMessage, date: new Date().toISOString() }],
        }));
        setEditingUser(null);
      } else {
        alert(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-[#000091] mb-8 text-center">Détails des utilisateurs</h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th className="border px-4 py-2 text-left">Nom</th>
                <th className="border px-4 py-2 text-left">Prénom</th>
                <th className="border px-4 py-2 text-left">Poste</th>
                <th className="border px-4 py-2 text-center">Heures supp</th>
                <th className="border px-4 py-2 text-center">Congés restants</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id_user} className="bg-indigo-500">
                  <td className="border px-4 py-2">{u.nom}</td>
                  <td className="border px-4 py-2">{u.prenom}</td>
                  <td className="border px-4 py-2">{u.poste}</td>
                  <td className="border px-4 py-2 text-center">
                    {u.solde_hsup}h
                    <Button className="ml-2 text-sm" onClick={() => handleUpdateField(u.id_user, "solde_hsup")}>Modifier</Button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {u.solde_conge} jours
                    <Button className="ml-2 text-sm" onClick={() => handleUpdateField(u.id_user, "solde_conge")}>Modifier</Button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Button variant="outline" className="text-[#000091]" onClick={() => openEditModal(u)}>Détails / Modifier</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-blue-800 p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Modifier {editingUser.prenom} {editingUser.nom}</h2>
              <div className="flex flex-col space-y-2">
                {["nom", "prenom", "poste", "mail", "solde_hsup", "solde_conge", "password"].map(field => (
                  <input
                    key={field}
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    type={field === "password" ? "password" : "text"}
                  />
                ))}
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={() => setEditingUser(null)}>Annuler</Button>
                <Button onClick={handleSave}>Enregistrer</Button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 mx-8">
          <h2 className="text-xl font-bold text-[#000091] mb-4">Historique des modifications</h2>
          {Object.keys(userHistory).length === 0 ? (
            <p className="text-gray-600">Aucune modification récente.</p>
          ) : (
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="border px-4 py-2 text-left">Utilisateur</th>
                  <th className="border px-4 py-2 text-left">Message</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userHistory).map(([userId, logs]) =>
                  logs.slice(-5).map((log, i) => {
                    const user = users.find(u => u.id_user === parseInt(userId));
                    return (
                      <tr key={`${userId}-${i}`} className="bg-indigo-100 text-black">
                        <td className="border px-4 py-2 font-bold">{user ? `${user.nom} ${user.prenom} ` : userId}</td>
                        <td className="border px-4 py-2">{log.message}</td>
                        <td className="border px-4 py-2">{new Date(log.date).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
