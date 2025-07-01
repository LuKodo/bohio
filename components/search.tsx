
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Check, SearchIcon } from "lucide-react"
import { cn, property_types } from "@/lib/utils"
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

interface SearchProps {
  citiesAndStates?: {
    cities: {
      id: number;
      name: {
        en_US: string;
        es_ES: string;
      };
      state: {
        id: number;
        name: string;
      };
    }[]
  };
}

export function Search({ citiesAndStates }: SearchProps) {
  const [cities, setCities] = useState<{ value: string, label: string }[]>([])
  const [filters, setFilters] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("advancedFilters")
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    localStorage.setItem("advancedFilters", JSON.stringify(filters))
  }, [filters])

  useEffect(() => {
    if (citiesAndStates) {
      const formattedCities = citiesAndStates.cities.map(city => ({
        value: city.id.toString(),
        label: `${city.name.en_US}, ${city.state.name}`
      }));
      setCities(formattedCities);
    }
  }, [citiesAndStates]);

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Tabs defaultValue="comprar">
        <TabsList className="grid grid-cols-2 mb-4 w-full max-w-3xl mx-auto">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="arrendar">Arrendar</TabsTrigger>
        </TabsList>
        <TabsContent value="comprar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? cities.find((city) => city.value.toLocaleLowerCase().includes(value.toLocaleLowerCase()))?.label
                      : "¿Dónde quieres vivir?"}
                    <SearchIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0 h-[200px] overflow-y-auto">
                  <Command>
                    <CommandInput placeholder="¿Dónde quieres vivir?" className="h-9" />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.value}
                            value={city.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              updateFilter("cityId", currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {city.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === city.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Select onValueChange={(value) => updateFilter("tipoInmueble", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                {property_types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/propiedades'}>
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="arrendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? cities.find((city) => city.value.toLocaleLowerCase().includes(value.toLocaleLowerCase()))?.label
                      : "¿Dónde quieres vivir?"}
                    <SearchIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0 h-[200px] overflow-y-auto">
                  <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.value}
                            value={city.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              updateFilter("cityId", currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {city.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === city.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Select onValueChange={(value) => updateFilter("tipoInmueble", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                {property_types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/propiedades'}>
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
