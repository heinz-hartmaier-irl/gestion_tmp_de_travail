"use client";

import { useEffect, useState } from "react";

const handleStatusChange = async (id: number, status: string) => {
  try {
    const res = await fetch(`/api/demande/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut: status }),
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      alert(`Demande ${status}`);
      window.location.reload();
    } else {
      alert(data.error || "Erreur lors de la mise à jour du statut.");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la mise à jour du statut.");
  }
};

export default function DashboardAdminPage() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard", { credentials: "include" });
      const data = await res.json();
      console.log("Données reçues du backend:", data); 
      if (data.success) setDemandes(data.demandes);
      else alert(data.error || "Erreur lors du chargement du dashboard.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

  if (loading) return <p>Chargement du dashboard...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pr-[200px] pl-[200px]">
      <h1 className="text-[#000091] text-5xl mb-6 font-[modak]">Tableau de Bord Admin</h1>

      <div className="flex w-full flex-col justify-center items-center bg-[#000091] text-white p-6 mt-6 space-y-4 overflow-y-scroll rounded-2xl shadow-lg">
        <h2 className="text-4xl mb-4 font-[modak]">Demandes des employés</h2>

        {demandes.map((d) => (
          <div
            key={d.id_demande}
            className="w-full flex flex-row justify-between items-center bg-[#1a1a9c] p-4 rounded-lg shadow-md"
          >
            {/* Infos utilisateur */}
            <div className="flex items-center space-x-4 w-1/5">
              <img
                src={d.photo || "/uploads/default.gif"}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-white"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{d.nom}</span>
                <span className="text-sm">{d.prenom}</span>
              </div>
            </div>

            {/* Infos de la demande */}
            <div className="flex flex-col w-1/4">
              <span>Type : <b>{d.type}</b></span>
              <span>Du : {new Date(d.date_debut).toLocaleDateString()}</span>
              <span>Au : {new Date(d.date_fin).toLocaleDateString()}</span>
            </div>

            {/* Statut */}
            <div className="flex flex-col w-1/6 text-center">
              <span className="font-semibold">Statut :</span>
              <span
                className={
                  d.statut_demande === "en attente"
                    ? "text-yellow-300"
                    : d.statut_demande === "acceptée"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {d.statut_demande}
              </span>
            </div>

            {/* Justificatif */}
            <div className="flex flex-col w-1/6 items-center">
              <span className="font-semibold mb-1">Justificatif :</span>
              {d.justificatif === "Justificatif non nécessaire" ? (
                <span className="text-gray-200 italic">{d.justificatif}</span>
              ) : d.justificatif ? (
                <a
                  href={d.justificatif}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#000091] px-3 py-1 rounded hover:bg-gray-200 font-semibold transition"
                >
                  Télécharger
                </a>
              ) : (
                <span className="text-gray-300 italic">Aucun</span>
              )}
            </div>
            {/* Actions */}
            <div className="flex flex-col space-y-2 w-1/6 items-center">
              <button
                onClick={() => handleStatusChange(d.id_demande, "acceptée")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accepter
              </button>
              <button
                onClick={() => handleStatusChange(d.id_demande, "refusée")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
