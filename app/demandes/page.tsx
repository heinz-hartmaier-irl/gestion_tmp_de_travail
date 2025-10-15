"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover as ComboPopover,
  PopoverContent as ComboPopoverContent,
  PopoverTrigger as ComboPopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";

const demandeTypes = [
  { value: "conge", label: "Congé" },
  { value: "maladie", label: "Arrêt maladie" },
  { value: "hsup", label: "Heures supplémentaires" },
];

export default function DemandesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [justificatif, setJustificatif] = useState<File | string | null>(null);
  const [openType, setOpenType] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setJustificatif(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedType || !startDate || !endDate) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("startDate", startDate.toISOString());
    formData.append("endDate", endDate.toISOString());

    // Gestion dynamique du justificatif
    if (selectedType === "hsup" && typeof justificatif === "string") {
      formData.append("justificatif", justificatif); // texte
    } else if (selectedType === "maladie" && justificatif instanceof File) {
      formData.append("justificatif", justificatif); // fichier
    }
    // pour congé, rien n'est ajouté

    try {
      const res = await fetch("/api/demande", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Demande enregistrée avec succès !");
      } else {
        alert("Erreur lors de l’envoi de la demande.");
      }
    } catch (err) {
      console.error("Erreur requête:", err);
      alert("Erreur de communication avec le serveur.");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">Non connecté</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl mb-4 font-[modak] text-[#000091]">Demandes</h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Partie gauche : formulaire */}
        <div className="flex-1 bg-gray-300 p-8 flex flex-col justify-center">
          <div className="space-y-5 text-lg">
            {/* Type de demande */}
            <div className="flex flex-col mb-4">
              <Label className="font-[modak] text-gray-700 mb-2">Type de demande</Label>
              <ComboPopover open={openType} onOpenChange={setOpenType}>
                <ComboPopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-3/4 justify-between bg-gray-400 text-white hover:bg-gray-500"
                  >
                    {selectedType
                      ? demandeTypes.find((t) => t.value === selectedType)?.label
                      : "Sélectionnez un type"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </ComboPopoverTrigger>
                <ComboPopoverContent className="w-3/4 p-0 bg-white text-gray-800 rounded-lg shadow-md">
                  <Command>
                    <CommandInput placeholder="Rechercher un type..." />
                    <CommandEmpty>Aucun résultat.</CommandEmpty>
                    <CommandGroup className="w-3/4 p-0 bg-white text-gray-800 rounded-lg shadow-md">
                      {demandeTypes.map((t) => (
                        <CommandItem
                          key={t.value}
                          onSelect={() => {
                            setSelectedType(t.value);
                            setJustificatif(null); // reset le justificatif à chaque changement
                            setOpenType(false);
                          }}
                        >
                          {t.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </ComboPopoverContent>
              </ComboPopover>
            </div>

            {/* Dates affichées */}
            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Début :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">
                {startDate ? format(startDate, "dd/MM/yyyy") : ""}
              </span>

              <span className="font-[modak] text-gray-700 mt-2">Fin :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4">
                {endDate ? format(endDate, "dd/MM/yyyy") : ""}
              </span>
            </div>

            {/* Justificatif dynamique */}
            <div className="flex flex-col">
              <Label htmlFor="justificatif" className="font-[modak] text-gray-700">
                Justificatif
              </Label>

              {selectedType === "hsup" ? (
                <Input
                  id="justificatif_hsup"
                  type="text"
                  placeholder="Indiquez la nature des heures supplémentaires"
                  value={typeof justificatif === "string" ? justificatif : ""}
                  onChange={(e) => setJustificatif(e.target.value)}
                  className="w-3/4 mt-2"
                />
              ) : selectedType === "conge" ? (
                <span className="text-gray-500 mt-2">Pas de justificatif nécessaire pour les congés</span>
              ) : (
                <Input
                  id="justificatif_file"
                  type="file"
                  onChange={handleFileChange}
                  className="w-3/4 mt-2"
                />
              )}
            </div>

            {/* Bouton d’envoi */}
            <div className="flex flex-col">
              <Button onClick={handleSubmit} className="bg-[#000091] text-white hover:bg-[#2a2ab3]">
                Envoyer la demande
              </Button>
            </div>
          </div>
        </div>

        {/* Partie droite : calendrier */}
        <div className="flex-1 bg-gray-400 text-white flex flex-col justify-center items-center p-8">
          <div className="flex flex-col items-center bg-gray-500 p-6 rounded-xl w-3/4 shadow-inner">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold">
                📅
              </div>
              <h2 className="font-[poppins] mt-3 text-xl font-semibold">
                Veuillez sélectionner une date
              </h2>
            </div>
            
            <div className="dark bg-gray-700 text-white rounded-lg p-4 w-full">
              <Calendar
                mode="range"
                className="w-full rounded-md bg-gray-700 text-white border border-gray-600"
                selected={{ from: startDate, to: endDate }}
                onSelect={(range) => {
                  if (range) {
                    setStartDate(range.from || undefined);
                    setEndDate(range.to || undefined);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
