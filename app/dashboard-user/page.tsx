"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // ← ici


export default function DashboardUserPage() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard", { credentials: "include" });
        const data = await res.json();
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.files?.[0]) {
      setUploadingId(id);
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (id: number) => {
    if (!fileToUpload) return;

    const formData = new FormData();
    formData.append("justificatif", fileToUpload);
    formData.append("id_demande", id.toString());

    try {
      const res = await fetch("/api/demande", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setDemandes((prev) =>
          prev.map((d) =>
            d.id_demande === id ? { ...d, justificatif: data.justificatif } : d
          )
        );
        alert("Justificatif mis à jour !");
      } else {
        alert("Erreur lors de la mise à jour du justificatif");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setUploadingId(null);
      setFileToUpload(null);
    }
  };

  if (loading) return <p>Chargement du dashboard...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pr-[200px] pl-[200px]">
      <h1 className="text-[#000091] text-5xl mb-6 font-[modak]">Tableau de Bord User</h1>

      <div className="flex w-full flex-col justify-center items-center bg-[#000091] text-white p-6 mt-6 space-y-4 overflow-y-scroll rounded-2xl shadow-lg">
        <h2 className="text-4xl mb-4 font-[modak]">Mes demandes</h2>

        {demandes.map((d) => (
          <div
            key={d.id_demande}
            className="w-full flex flex-row justify-between items-center bg-[#1a1a9c] p-4 rounded-lg shadow-md"
          >
            {/* Infos utilisateur */}
            <div className="flex items-center space-x-4 w-1/5">
              <img
                src={d.photo || "/uploads/default.png"}
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
              {d.justificatif ? (
                <>
                  <a
                    href={d.justificatif}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#000091] px-3 py-1 rounded hover:bg-gray-200 font-semibold transition mb-2"
                  >
                    Télécharger
                  </a>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, d.id_demande)}
                    className="text-black"
                  />
                  <Button
                    onClick={() => handleUpload(d.id_demande)}
                    disabled={uploadingId !== d.id_demande}
                    className="mt-2 bg-green-500 text-white hover:bg-green-600"
                  >
                    {uploadingId === d.id_demande ? "Upload..." : "Remplacer"}
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, d.id_demande)}
                    className="text-black"
                  />
                  <Button
                    onClick={() => handleUpload(d.id_demande)}
                    disabled={uploadingId !== d.id_demande}
                    className="mt-2 bg-green-500 text-white hover:bg-green-600"
                  >
                    {uploadingId === d.id_demande ? "Upload..." : "Ajouter"}
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
