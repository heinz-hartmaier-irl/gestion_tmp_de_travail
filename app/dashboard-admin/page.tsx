export default function DashboardAdminPage() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pr-[200px] pl-[200px]">
      
      <h1 className="text-[#000091] text-5xl mb-6 font-[modak]">Tableau de Bord de Ioni Letellier</h1>

      <div className="flex w-full flex-col justify-center items-center bg-[#000091] text-white p-6 mt-6">
        <h2 className="text-4xl font-[modak]">Vos heures et congés</h2>
        <div className="flex w-full flex-row justify-center items-center text-white">
          <div className="w-full flex flex-col justify-between items-center p-10 font-[poppins]">
            <h3>Heures supplémentaire restante :</h3>
            <div className="w-full flex bg-white text-[#000091] flex-row justify-end items-center font-[poppins]">
              <h4>Il vous reste : 20h</h4>
              <button>*</button>
            </div>
            <div className="w-full flex flex-row justify-between items-center font-[poppins]">
              <h5>Modifié le : 12/01/2005</h5>
              <h5> Par : Ioni Letellier</h5>
            </div>
            <button>Poser Heures Supplémentaire</button>
          </div>

          <div className="w-full flex flex-col justify-between items-center p-10 font-[poppins]">
            <h3>Heures supplémentaire restante :</h3>
            <div className="w-full flex bg-white text-[#000091] flex-row justify-end items-center font-[poppins]">
              <h4>Il vous reste : 20h</h4>
              <button>*</button>
            </div>
            <div className="w-full flex flex-row justify-between items-center font-[poppins]">
              <h5>Modifié le : 12/01/2005</h5>
              <h5> Par : Ioni Letellier</h5>
            </div>
            <button>Poser Heures Supplémentaire</button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center items-center bg-[#000091] p-6 text-white mt-6 space-y-4 overflow-y-scroll">
        <h2 className="text-4xl mb-4 font-[modak]">Demandes des employés</h2>
        <div className="w-full flex flex-row space-x-4 font-[poppins]">
          <select className="p-2 rounded text-white">
            <option value="">Option 1</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
          <select className="p-2 rounded text-white">
            <option value="">Option A</option>
            <option value="">Option B</option>
            <option value="">Option C</option>
          </select>
          <select className="p-2 rounded text-white">
            <option value="">Janvier</option>
            <option value="">Février</option>
            <option value="">Mars</option>
          </select>
          <select className="p-2 rounded text-white">
            <option value="">2025</option>
            <option value="">2026</option>
            <option value="">2027</option>
          </select>
        </div>

        <div className="w-full flex flex-row justify-between items-center space-y-4 mt-4">
          <div className="flex flex-col justify-between items-center text-white p-2 rounded">
            <div className="flex flex-row justify-between items-center text-white p-2 rounded font-[poppins]">
              <img src="../app/uploads/linkedin.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
              <h4>Nom</h4>
              <h4>Prénom</h4>
            </div>
            <h5>Le : 16/01/2005</h5>
          </div>

          <div className="flex flex-col justify-between items-center text-white p-2 rounded font-[poppins]">
            <h4>Type : Congés</h4>
            <h5>Du : 28/01/2005 </h5>
            <h5>Au : 29/02/2005</h5>
          </div>

          <div className="flex flex-col justify-between items-center text-white p-2 rounded font-[poppins]">
            <h4>Statut : En Attente</h4>
          </div>

          <div className="flex flex-col justify-end">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-[poppins]">
              Accepter
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-[poppins]">
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}