"use client"

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropertyFilters } from "@/components/property-filters";
import { PropertyGrid } from "@/components/property-grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";


export default function PropiedadesPage() {
  const [page, _setPage] = useState(1)
  const [size, _setSize] = useState(10)
  const searchParams = useSearchParams()

  const type_service = searchParams.get("type_service") || ""

  const [filters, setFilters] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("advancedFilters")
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const fetcher = (url: string) => fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...filters,
      page,
      size,
    }),
  }).then(async (res) => {
    return await res.json()
  })

  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString())
    }
  })

  const { data, error } = useSWR(`/api/properties?${params}`, fetcher)

  if (error) return <div>Error fetching properties</div>

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PropertyFilters filters={filters} setFilters={setFilters} />
      <main className="flex-1 bg-gray-50">
        <div className="container py-6 px-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Propiedades en {type_service === 'rent' ? 'Arriendo' : type_service === 'sale' ? 'Venta' : 'Venta/Arriendo'}</h1>
              <p className="text-muted-foreground"> resultados encontrados</p>
            </div>
          </div>
          {(!data) ? (<div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            <span className="ml-2 text-gray-500">Cargando propiedades...</span>
          </div>) : (
            <PropertyGrid properties={data} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
