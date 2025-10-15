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
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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

  // ✅ Fonction pour accepter ou refuser une demande
  const handleDecision = async (id: number, statut: 'Acceptée' | 'Refusée') => {
    const confirmation = window.confirm(
      `Êtes-vous sûr de vouloir ${statut === 'Acceptée' ? 'accepter' : 'refuser'} cette demande ?`
    );
    if (!confirmation) return;

    try {
      const res = await fetch(`/api/demandes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      });

      if (res.ok) {
        // Met à jour localement le statut sans recharger
        setDemandes((prev) =>
          prev.map((d) =>
            d.id_demande === id ? { ...d, statut_demande: statut } : d
          )
        );
      } else {
        alert('Erreur lors de la mise à jour du statut.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur serveur.');
    }
  };

  const filteredDemandes = demandes.filter((d) =>
    (!selectedFilters.type || d.type === selectedFilters.type) &&
    (!selectedFilters.statut || d.statut_demande === selectedFilters.statut) &&
    (!selectedFilters.nom || d.nom === selectedFilters.nom) &&
    (!selectedFilters.date || d.date_demande === selectedFilters.date)
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pr-[200px] pl-[200px]">
      <h1 className="text-[#000091] text-5xl mb-6 font-[modak]">
        Tableau de Bord de {user?.prenom} {user?.nom}
      </h1>

      {/* Bloc heures et congés */}
      <div className="flex w-full flex-col justify-center items-center bg-[#000091] text-white p-6 mt-6 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-[modak]">Vos heures et congés</h2>
        <div className="flex w-full flex-row justify-center items-center text-white">
          <div className="w-full flex flex-col justify-between items-center p-10 font-[poppins]">
            <h3 className="pb-5 text-lg">Jours de congés payés restant :</h3>
            <div className="w-full bg-white flex justify-end text-[#000091] font-[poppins] text-md p-3 rounded-lg">
              <div className="flex flex-row justify-center w-full items-center">
                <h4>Il vous reste : {user?.solde_conge} jours</h4>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center font-[poppins] text-sm pb-10">
              <h5>Modifié le : 11/01/2005</h5>
              <h5> Par : {user?.prenom} {user?.nom}</h5>
            </div>
            <button className="bg-[#000091] p-3 justify-center text-white border border-white rounded-lg hover:text-[#000091] hover:bg-white transition disabled:opacity-50">
              Poser des Congés Payés
            </button>
          </div>

          <div className="w-full flex flex-col justify-between items-center p-10 font-[poppins]">
            <h3 className="pb-5 text-lg">Heures supplémentaire restante :</h3>
            <div className="w-full bg-white flex justify-end text-[#000091] font-[poppins] text-md p-3 rounded-lg">
              <div className="flex flex-row justify-between w-75 items-center">
                <h4>Il vous reste : {user?.solde_hsup} heures</h4>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center font-[poppins] text-sm pb-10">
              <h5>Modifié le : 12/01/2005</h5>
              <h5> Par : {user?.prenom} {user?.nom}</h5>
            </div>
            <button className="bg-[#000091] p-3 justify-center text-white border border-white rounded-lg hover:text-[#000091] hover:bg-white transition disabled:opacity-50">
              Poser Heures Supplémentaire
            </button>
          </div>
        </div>
      </div>

      {/* Bloc demandes */}
      <div className="flex w-full flex-col justify-center items-center bg-[#000091] p-6 text-white mt-6 rounded-2xl shadow-lg">
        <h2 className="text-4xl mb-4 font-[modak]">Demandes des employés</h2>

        {/* Filtres dynamiques */}
        <div className="w-full flex flex-row font-[poppins] mb-4">
          <select
            className="p-2 text-white border border-white rounded-tl-lg bg-[#000091]"
            value={selectedFilters.type}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
          >
            <option value="">Type</option>
            {filters.types?.map((t: any) => (
              <option key={t.type} value={t.type}>
                {t.type}
              </option>
            ))}
          </select>

          <select
            className="p-2 text-white border border-white bg-[#000091]"
            value={selectedFilters.statut}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, statut: e.target.value })}
          >
            <option value="">Statut</option>
            {filters.statuts?.map((s: any) => (
              <option key={s.statut_demande} value={s.statut_demande}>
                {s.statut_demande}
              </option>
            ))}
          </select>

          <select
            className="p-2 text-white border border-white bg-[#000091]"
            value={selectedFilters.nom}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, nom: e.target.value })}
          >
            <option value="">Nom</option>
            {filters.noms?.map((n: any) => (
              <option key={n.nom} value={n.nom}>
                {n.nom}
              </option>
            ))}
          </select>

          <select
            className="p-2 text-white border border-white bg-[#000091]"
            value={selectedFilters.date}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, date: e.target.value })}
          >
            <option value="">Date</option>
            {filters.dates?.map((d: any) => (
              <option key={d.date_demande} value={d.date_demande}>
                {formatDate(d.date_demande)}
              </option>
            ))}
          </select>
        </div>

        {/* Liste des demandes */}
        <div className="w-full flex flex-col overflow-y-scroll max-h-[40vh]">
          {filteredDemandes.map((demande) => (
            <div
              key={demande.id_demande}
              className="w-full flex flex-row justify-between items-center bg-white border-b border-[#000091] rounded-b-lg rounded-tr-lg"
            >
              <div className="flex flex-col justify-center items-center w-full text-[#000091] p-2">
                <div className="flex flex-row justify-center items-center text-[#000091] p-2 rounded font-[poppins]">
                  <img
                    src={demande.photo}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <h4 className="pr-1 text-lg">
                    <strong>{demande.nom}</strong>
                  </h4>
                  <h4 className="text-lg">
                    <strong>{demande.prenom}</strong>
                  </h4>
                </div>
                <h5 className="text-md">Le : {formatDate(demande.date_demande)}</h5>
              </div>

              <div className="w-1 bg-[#000091] h-30" />

              <div className="flex flex-col justify-center items-center w-full text-[#000091] p-2 rounded font-[poppins]">
                <h4 className="text-lg">
                  <strong>Type : {demande.type}</strong>
                </h4>
                <h5 className="text-md">Du : {formatDate(demande.date_debut)}</h5>
                <h5 className="text-md">Au : {formatDate(demande.date_fin)}</h5>
              </div>

              <div className="w-1 bg-[#000091] h-30" />

              <div className="flex flex-col justify-center items-center w-full text-[#000091] p-2 rounded font-[poppins]">
                <h4 className="text-lg">
                  <strong>Statut : {demande.statut_demande}</strong>
                </h4>
              </div>

              <div className="w-1 bg-[#000091] h-30" />

              <div className="flex flex-col justify-center items-center w-full">
                {demande.statut_demande === 'En Attente' ? (
                  <>
                    <button
                      className="bg-green-500 text-white text-lg px-4 py-2 rounded font-[poppins] mb-2 hover:bg-green-600"
                      onClick={() => handleDecision(demande.id_demande, 'Acceptée')}
                    >
                      Accepter
                    </button>
                    <button
                      className="bg-red-500 text-white text-lg px-4 py-2 rounded font-[poppins] hover:bg-red-600"
                      onClick={() => handleDecision(demande.id_demande, 'Refusée')}
                    >
                      Refuser
                    </button>
                  </>
                ) : (
                  <button className="bg-gray-400 text-white text-lg px-4 py-2 rounded font-[poppins] cursor-not-allowed">
                    {demande.statut_demande}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
