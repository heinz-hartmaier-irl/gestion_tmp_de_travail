

export default function ProfilPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl mb-4 font-[modak] text-[#000091]">
        Profil Utilisateur
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex-1 bg-gray-300 p-8 flex flex-col justify-center">
          <div className="space-y-5 text-lg">
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Nom :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">Letellier</span>
            </div>

            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Prénom :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">Ioni</span>
            </div>

            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Poste :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">Admin</span>
            </div>

            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Date d’arrivée :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">09/09/2024</span>
            </div>

            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Mail :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">ioni.letell@gmail.com</span>
            </div>
          </div>
        </div>


        <div className="flex-1 bg-gray-400 text-white flex flex-col justify-center items-center p-8">
          <div className="flex flex-col items-center bg-gray-500 p-6 rounded-xl w-3/4 shadow-inner">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold">
                👤
              </div>
              
              <h2 className="font-[poppins] mt-3 text-xl font-semibold">Statut</h2>
            </div>

            <div className="w-full bg-gray-300 text-gray-800 p-4 rounded-lg">
              <p className="font-medium font-[poppins]">Solde heures supp :</p>
              <div className="bg-gray-100 rounded-md px-3 py-2 mb-3">10h</div>

              <p className="font-medium font-[poppins]">Solde congés :</p>
              <div className="bg-gray-100 rounded-md px-3 py-2">25 jours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
