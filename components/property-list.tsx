import { useEffect, useState } from "react"
import { PropertyCard } from "./property-card"

export function PropertyList() {
  const [properties, setProperties] = useState<any[]>([])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: 1,
            size: 10,
          }),
        })
        if (!response.ok) {
          throw new Error("Error fetching properties")
        }
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties([])
      }
    }
    fetchProperties()
  }, [])


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property: any) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
