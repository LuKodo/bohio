'use client'

import { Bath, BedDouble, CircleParking, Coins, DraftingCompass, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"

type FilterKey = 'precio' | 'habitaciones' | 'banos' | 'area' | 'parqueadero'


export function PropertyFilters({ filters, setFilters }: { filters: Record<string, any>, setFilters: (filters: Record<string, any>) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<FilterKey | null>(null)

  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const removeFilter = (key: string) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    setFilters(newFilters)
  }

  const openModal = (filterType: FilterKey) => {
    setCurrentFilter(filterType)
    setIsModalOpen(true)
  }

  useEffect(() => {
    localStorage.setItem("advancedFilters", JSON.stringify(filters))
  }, [filters])

  const closeModal = () => setIsModalOpen(false)

  const clearAllFilters = () => setFilters({})

  const renderModalContent = () => {
    switch (currentFilter) {
      case "precio":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Precio</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Mínimo"
                type="number"
                value={filters.precioMin || ""}
                onChange={(e) => updateFilter("precioMin", e.target.value ? Number(e.target.value) : null)}
              />
              <Input
                placeholder="Máximo"
                type="number"
                value={filters.precioMax || ""}
                onChange={(e) => updateFilter("precioMax", e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          </div>
        )
      case "habitaciones":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Habitaciones</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  variant={filters.habitaciones === num ? "default" : "outline"}
                  onClick={() => updateFilter("habitaciones", num)}
                >
                  {num} {num === 4 && "+"}
                </Button>
              ))}
            </div>
          </div>
        )
      case "banos":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Baños</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  variant={filters.baños === num ? "default" : "outline"}
                  onClick={() => updateFilter("banos", num)}
                >
                  {num} {num === 4 && "+"}
                </Button>
              ))}
            </div>
          </div>
        )
      case "area":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Área (m²)</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Mínimo"
                type="number"
                value={filters.areaMin || ""}
                onChange={(e) => updateFilter("areaMin", e.target.value ? Number(e.target.value) : null)}
              />
              <Input
                placeholder="Máximo"
                type="number"
                value={filters.areaMax || ""}
                onChange={(e) => updateFilter("areaMax", e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          </div>
        )
      case "parqueadero":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Parqueadero</h3>
            <div className="flex gap-2">
              <Button
                variant={filters.parqueadero === true ? "default" : "outline"}
                onClick={() => updateFilter("parqueadero", true)}
              >
                Sí
              </Button>
              <Button
                variant={filters.parqueadero === false ? "default" : "outline"}
                onClick={() => updateFilter("parqueadero", false)}
              >
                No
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="sticky top-16 z-40 bg-white border-b shadow-sm px-4">
      <div className="container py-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar por ubicación, barrio o proyecto..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de inmueble" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="lote">Lote</SelectItem>
              <SelectItem value="bodega">Bodega</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-red-600 hover:bg-red-700">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="outline" size="sm" onClick={() => openModal("precio")}>
            <Coins className="h-4 w-4 mr-1" />
            Precio
          </Button>
          <Button variant="outline" size="sm" onClick={() => openModal("habitaciones")}>
            <BedDouble className="h-4 w-4 mr-1" />
            Habitaciones
          </Button>
          <Button variant="outline" size="sm" onClick={() => openModal("banos")}>
            <Bath className="h-4 w-4 mr-1" />
            Baños
          </Button>
          <Button variant="outline" size="sm" onClick={() => openModal("area")}>
            <DraftingCompass className="h-4 w-4 mr-1" />
            Área (m²)
          </Button>
          <Button variant="outline" size="sm" onClick={() => openModal("parqueadero")}>
            <CircleParking className="h-4 w-4 mr-1" />
            Parqueadero
          </Button>
        </div>

        {Object.keys(filters).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t items-center">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {Object.entries(filters).map(([key, value], index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {key}:{" "}
                {typeof value === "boolean" ? (value ? "Sí" : "No") : value}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeFilter(key)}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={clearAllFilters}
            >
              Limpiar todos
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentFilter && currentFilter?.charAt(0).toUpperCase() + currentFilter?.slice(1)}</DialogTitle>
          </DialogHeader>
          {renderModalContent()}
          <div className="mt-4 flex justify-end">
            <Button onClick={closeModal}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
