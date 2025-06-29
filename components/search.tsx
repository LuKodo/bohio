import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Tabs defaultValue="comprar">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="arrendar">Arrendar</TabsTrigger>
          <TabsTrigger value="proyectos">Proyectos nuevos</TabsTrigger>
        </TabsList>
        <TabsContent value="comprar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input placeholder="¿Dónde quieres vivir?" className="w-full" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="lote">Lote</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/propiedades'}>
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Precio
            </Button>
            <Button variant="outline" size="sm">
              Habitaciones
            </Button>
            <Button variant="outline" size="sm">
              Baños
            </Button>
            <Button variant="outline" size="sm">
              Área
            </Button>
            <Button variant="outline" size="sm">
              Más filtros
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="arrendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input placeholder="¿Dónde quieres vivir?" className="w-full" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-red-600 hover:bg-red-700">
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Precio
            </Button>
            <Button variant="outline" size="sm">
              Habitaciones
            </Button>
            <Button variant="outline" size="sm">
              Baños
            </Button>
            <Button variant="outline" size="sm">
              Área
            </Button>
            <Button variant="outline" size="sm">
              Más filtros
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="proyectos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input placeholder="¿Dónde quieres vivir?" className="w-full" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamentos</SelectItem>
                <SelectItem value="casa">Casas</SelectItem>
                <SelectItem value="mixto">Uso mixto</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-red-600 hover:bg-red-700">
              <SearchIcon className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Precio
            </Button>
            <Button variant="outline" size="sm">
              Área
            </Button>
            <Button variant="outline" size="sm">
              Habitaciones
            </Button>
            <Button variant="outline" size="sm">
              Estado
            </Button>
            <Button variant="outline" size="sm">
              Más filtros
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
