import { PropertyCard } from "./property-card"

export function PropertyList() {
  // Datos de ejemplo para las propiedades
  const properties = [
    {
      id: 1,
      title: "Apartamento en Chapinero",
      price: "650.000.000",
      location: "Chapinero, Bogotá",
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      image: "/placeholder.svg?height=300&width=400",
      type: "Apartamento",
      isNew: false,
    },
    {
      id: 2,
      title: "Casa en Ciudad Jardín",
      price: "980.000.000",
      location: "Ciudad Jardín, Cali",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: "/placeholder.svg?height=300&width=400",
      type: "Casa",
      isNew: true,
    },
    {
      id: 3,
      title: "Apartamento en El Poblado",
      price: "750.000.000",
      location: "El Poblado, Medellín",
      bedrooms: 2,
      bathrooms: 2,
      area: 75,
      image: "/placeholder.svg?height=300&width=400",
      type: "Apartamento",
      isNew: false,
    },
    {
      id: 4,
      title: "Oficina en Centro Internacional",
      price: "1.200.000.000",
      location: "Centro Internacional, Bogotá",
      bedrooms: 0,
      bathrooms: 2,
      area: 120,
      image: "/placeholder.svg?height=300&width=400",
      type: "Oficina",
      isNew: true,
    },
    {
      id: 5,
      title: "Casa en Laureles",
      price: "850.000.000",
      location: "Laureles, Medellín",
      bedrooms: 3,
      bathrooms: 3,
      area: 160,
      image: "/placeholder.svg?height=300&width=400",
      type: "Casa",
      isNew: false,
    },
    {
      id: 6,
      title: "Apartamento en Rosales",
      price: "1.100.000.000",
      location: "Rosales, Bogotá",
      bedrooms: 3,
      bathrooms: 2,
      area: 110,
      image: "/placeholder.svg?height=300&width=400",
      type: "Apartamento",
      isNew: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
