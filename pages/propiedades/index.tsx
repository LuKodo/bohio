"use client"

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropertyFilters } from "@/components/property-filters";
import { PropertyGrid } from "@/components/property-grid";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";


export default function PropiedadesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, _setPage] = useState(1)
  const [size, _setSize] = useState(10)
  const searchParams = useSearchParams()
  const type_service = searchParams.get("type_service") || ""

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PropertyFilters setProperties={setProperties} setLoading={setLoading} page={page} size={size} />
      <main className="flex-1 bg-gray-50">
        <div className="container py-6 px-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Propiedades en {type_service === 'rent' ? 'Arriendo' : type_service === 'sale' ? 'Venta' : 'Venta/Arriendo'}</h1>
              <p className="text-muted-foreground"> resultados encontrados</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <select className="border rounded-md px-3 py-1 text-sm">
                <option>Más relevantes</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Más recientes</option>
                <option>Área: mayor a menor</option>
              </select>
            </div>
          </div>
          <PropertyGrid properties={properties} loading={loading} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
