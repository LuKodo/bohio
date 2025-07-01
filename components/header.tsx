import Link from "next/link"
import { Building2, Heart, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [filters, setFilters] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("advancedFilters")
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const redirect = (value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      type_service: value,
    }))

    localStorage.setItem("advancedFilters", JSON.stringify({ ...filters, type_service: value }))
    window.location.href = "/propiedades?" + new URLSearchParams({ type_service: value }).toString()
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-4" style={{ zIndex: 10000 }}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">Bohio Consultores</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#" onClick={() => redirect("sale")} className="text-sm font-medium hover:text-red-600">
              Venta
            </Link>
            <Link href="#" onClick={() => redirect("rent")} className="text-sm font-medium hover:text-red-600">
              Arriendo
            </Link>
            <Link href="#" onClick={() => redirect("sale_rent")} className="text-sm font-medium hover:text-red-600">
              Venta/Arriendo
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-red-600">
            <Heart className="h-4 w-4" />
            <span>Favoritos</span>
          </Link>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Ingresar
          </Button>
          <Button variant="default" size="sm" className="hidden md:flex bg-red-600 hover:bg-red-700">
            Publicar
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
