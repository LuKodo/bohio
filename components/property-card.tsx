import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

interface PropertyCardProps {
  property: any
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] relative">
          <Image src={property.image || "https://placehold.co/300x400"} alt={property.title} fill className="object-cover" />
        </div>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Añadir a favoritos</span>
        </Button>
        {property.isNew && <Badge className="absolute top-2 left-2 bg-red-600">Nuevo</Badge>}
        <Badge className="absolute bottom-2 left-2 bg-black/70">{property.property_type}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
        </div>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.city}</span>
        </div>
        <p className="font-bold text-xl">{property.sale_value_from === 0 ? formatPrice(property.rent_value_from) : formatPrice(property.sale_value_from)}</p>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1" />
            <span>{property.num_bedrooms} hab</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.num_bathrooms} baños</span>
          </div>
          <div className="flex items-center">
            <Ruler className="h-4 w-4 mr-1" />
            <span>{Number(property.property_area)} m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/propiedades/${property.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
