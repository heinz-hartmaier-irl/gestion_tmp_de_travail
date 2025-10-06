"use client"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
 

export default function DemandesPage() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl mb-4 font-[modak] text-[#000091]">
        Demandes
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex-1 bg-gray-300 p-8 flex flex-col justify-center">
          <div className="space-y-5 text-lg">
            <div className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                                >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Select framework..."}
                                <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                    {frameworks.map((framework) => (
                                        <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                        >
                                        {framework.label}
                                        <Check
                                            className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                            </Popover>
                        )
                    }
            </div>

            <div className="flex flex-col">
              <span className="font-[modak] text-gray-700">Début :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4"></span>
              <span className="font-[modak] text-gray-700">Fin :</span>
              <span className="bg-gray-400 font-[poppins] text-white px-3 py-2 rounded-md w-3/4"></span>
            </div>

            <div className="flex flex-col">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="justificatif">Justificatif</Label>
                    <Input id="justificatif" type="file" />
                </div>
            </div>

            <div className="flex flex-col">
              <Button>Button</Button>
            </div>

            <div className="flex flex-col">
              <Button>Envoyer</Button>
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
