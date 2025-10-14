"use client";
import { useEffect, useState } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const res = await fetch("/api/profil", { method: "GET", credentials: "include" });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("Erreur fetch profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">Non connecté</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl mb-4 font-[modak] text-[#000091]">Profil Utilisateur</h1>
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex-1 bg-gray-300 p-8 flex flex-col justify-center">
          <div className="space-y-5 text-lg">
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Nom :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">{user.nom}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Prénom :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">{user.prenom}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Poste :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">{user.poste}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Date d’arrivée :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">
                {new Date(user.date_entree).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Mail :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">{user.mail}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-400 text-white flex flex-col justify-center items-center p-8">
          <div className="flex flex-col items-center bg-gray-500 p-6 rounded-xl w-3/4 shadow-inner">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold">👤</div>
              <h2 className="font-[poppins] mt-3 text-xl font-semibold">{user.statut}</h2>
            </div>
            <div className="w-full bg-gray-300 text-gray-800 p-4 rounded-lg">
              <p className="font-medium font-[poppins]">Solde heures supp :</p>
              <div className="bg-gray-100 rounded-md px-3 py-2 mb-3">{user.solde_hsup} h</div>
              <p className="font-medium font-[poppins]">Solde congés :</p>
              <div className="bg-gray-100 rounded-md px-3 py-2">{user.solde_conge} jours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
