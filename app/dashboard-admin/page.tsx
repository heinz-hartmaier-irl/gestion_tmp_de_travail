'use client';

import { useEffect, useState } from 'react';

interface User {
  solde_conge: number;
  solde_hsup: number;
  nom: string;
  prenom: string;
}

interface Demande {
  id_demande: number;
  type: string;
  date_demande: string;
  date_debut: string;
  date_fin: string;
  statut_demande: string;
  nom: string;
  prenom: string;
  photo: string;
  justificatif?: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
}

export default function DashboardAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [selectedFilters, setSelectedFilters] = useState({ type: '', statut: '', nom: '', date: '' });

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setDemandes(data.demandes);
        setFilters(data.filters);
      });
  }, []);

  const filteredDemandes = demandes.filter(d => {
    const matchesType = !selectedFilters.type || d.type === selectedFilters.type;
    const matchesStatut = !selectedFilters.statut || d.statut_demande === selectedFilters.statut;
    const matchesNom = !selectedFilters.nom || d.nom === selectedFilters.nom;
    const matchesDate = !selectedFilters.date || (() => {
      const [month, year] = selectedFilters.date.split('/');
      const date = new Date(d.date_debut);
      return String(date.getMonth()+1).padStart(2,'0') === month && date.getFullYear() === Number(year);
    })();
    return matchesType && matchesStatut && matchesNom && matchesDate;
  });

  const handleDownload = (id: number) => {
    const demande = demandes.find(d => d.id_demande === id);
    if (!demande?.justificatif) return alert("Aucun justificatif disponible.");
    const link = document.createElement("a");
    link.href = `${window.location.origin}${demande.justificatif}`;
    link.download = demande.justificatif.split("/").pop()!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const handleDecision = async (id: number, decision: string) => {
  try {
    const res = await fetch("/api/update-demande", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_demande: id, decision }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Erreur inconnue");

    // ✅ Met à jour l’état local pour refléter la décision
    setDemandes((prev) =>
      prev.map((d) =>
        d.id_demande === id ? { ...d, statut_demande: decision } : d
      )
    );

    alert(`Demande ${decision.toLowerCase()} avec succès !`);
  } catch (err: any) {
    alert("❌ " + err.message);
  }
};


  // Carte solde améliorée
  const soldeCard = (title: string, value: number, btnText: string, unit: string, color: string) => (
    <div className={`flex flex-col justify-between items-center p-6 w-full rounded-2xl shadow-lg border-t-4 ${color} bg-white hover:scale-[1.02] transition-transform duration-200`}>
      <h3 className="text-2xl font-[Modak] mb-2 text-center text-[#000091]">{title}</h3>
      
      <div className="flex items-baseline justify-center gap-1 mb-4">
        <span className="text-5xl font-bold text-[#000091]">{value}</span>
        <span className="text-lg text-[#000091] font-semibold">{unit}</span>
      </div>

      <button
        className="px-6 py-2.5 rounded-xl bg-[#ff6400] text-white font-[poppins] font-semibold shadow-md hover:bg-[#ff8533] transition"
      >
        {btnText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen px-8 py-6 bg-[#f0f2f8] font-[poppins]">
      <h1 className="text-5xl font-[Modak] text-[#000091] mb-8 text-center">
        Tableau de Bord de {user?.prenom} {user?.nom}
      </h1>

      {/* Bloc heures et congés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {user && (
          <>
            {soldeCard("Jours de congés restants", user.solde_conge, "Poser des congés", "jours", "border-[#000091]")}
            {soldeCard("Heures supplémentaires restantes", user.solde_hsup, "Poser heures sup.", "heures", "border-[#ff6400]")}
          </>
        )}
      </div>

      {/* Bloc demandes */}
      <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
        <h2 className="text-3xl font-[Modak] text-[#000091] mb-6">Demandes des employés</h2>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6">
          {["type","statut","nom","date"].map((f) => (
            <select
              key={f}
              className="p-2 border border-[#000091] rounded-xl font-[poppins] text-[#000091] focus:ring-2 focus:ring-[#000091] outline-none"
              value={(selectedFilters as any)[f]}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, [f]: e.target.value })}
            >
              <option value="">{f === "date" ? "Mois/Année" : f.charAt(0).toUpperCase()+f.slice(1)}</option>
              {f === "type" && filters.types?.map((t: any) => <option key={t.type} value={t.type}>{t.type}</option>)}
              {f === "statut" && filters.statuts?.map((s: any) => <option key={s.statut_demande} value={s.statut_demande}>{s.statut_demande}</option>)}
              {f === "nom" && filters.noms?.map((n: any) => <option key={n.nom} value={n.nom}>{n.nom}</option>)}
              {f === "date" && Array.from(new Set(filters.dates?.map((d: any) => {
                const date = new Date(d.date_demande);
                return `${String(date.getMonth()+1).padStart(2,"0")}/${date.getFullYear()}`;
              }) || [])).map((m: string) => <option key={m} value={m}>{m}</option>)}
            </select>
          ))}
        </div>

        {/* Liste des demandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
          {filteredDemandes.map(d => {
            const statutColor = d.statut_demande === "Acceptée" ? "bg-green-500" 
                              : d.statut_demande === "Refusée" ? "bg-red-500" 
                              : "bg-yellow-500"; 

            return (
              <div key={d.id_demande} className="flex flex-col items-center border rounded-2xl p-6 gap-4 bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform">
                
                {/* Photo, nom et type */}
                <div className="flex flex-col items-center w-full">
                  <img src={d.photo} alt="Avatar" className="w-16 h-16 rounded-full object-cover mb-2"/>
                  <div className="font-[poppins] font-semibold text-[#000091] text-lg">{d.nom} {d.prenom}</div>
                  <div className="mt-1 px-3 py-1 rounded-full bg-[#e6e6ff] font-[poppins] font-semibold text-[#000091] text-sm">{d.type}</div>
                  <div className="text-sm text-[#1a1a1a] mt-1 font-[poppins]">Demandé le : {formatDate(d.date_demande)}</div>
                </div>

                {/* Statut */}
                <div className={`px-3 py-1 rounded-full text-white font-[poppins] font-semibold text-sm ${statutColor}`}>
                  {d.statut_demande}
                </div>

                {/* Dates début/fin */}
                <div className="w-full flex justify-around mt-2">
                  <div className="text-center font-[poppins] text-[#1a1a1a]">
                    <div className="text-sm font-semibold text-[#000091]">Début</div>
                    <div className="text-base font-bold">{formatDate(d.date_debut)}</div>
                  </div>
                  <div className="text-center font-[poppins] text-[#1a1a1a]">
                    <div className="text-sm font-semibold text-[#000091]">Fin</div>
                    <div className="text-base font-bold">{formatDate(d.date_fin)}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row gap-3 w-full mt-3">
                  {d.type === 'Arrêt Maladie' ? (
                    <button
                      className="flex-1 bg-[#000091] text-white rounded-xl px-4 py-2 font-[poppins] font-semibold hover:bg-opacity-90 transition"
                      onClick={() => handleDownload(d.id_demande)}
                    >
                      Télécharger
                    </button>
                  ) : d.statut_demande === 'En Attente' ? (
                    <>
                      <button
                        className="flex-1 bg-[#000091] text-white rounded-xl px-4 py-2 font-[poppins] font-semibold hover:bg-opacity-90 transition"
                        onClick={() => handleDecision(d.id_demande,'Acceptée')}
                      >
                        Accepter
                      </button>
                      <button
                        className="flex-1 bg-[#ff6400] text-white rounded-xl px-4 py-2 font-[poppins] font-semibold hover:bg-opacity-90 transition"
                        onClick={() => handleDecision(d.id_demande,'Refusée')}
                      >
                        Refuser
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 bg-gray-400 text-white rounded-xl px-4 py-2 font-[poppins] font-semibold cursor-not-allowed">
                      {d.statut_demande}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
