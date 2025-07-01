import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

export const property_types = [
  { value: 'house', label: 'Casa' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'blueprint', label: 'Plano' },
  { value: 'lot', label: 'Lote' },
  { value: 'bodega', label: 'Bodega' },
  { value: 'office', label: 'Oficina' },
  { value: 'finca', label: 'Finca' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'cabin', label: 'Cabaña' },
  { value: 'plot', label: 'Parcela' },
  { value: 'studio', label: 'Estudio' },
  { value: 'local', label: 'Local' },
]

export function definePropertyType(type: string): string {
  switch (type) {
    case 'house':
      return 'Casa';
    case 'apartment':
      return 'Apartamento';
    case 'blueprint':
      return 'Plano';
    case 'lot':
      return 'Lote';
    case 'bodega':
      return 'Bodega';
    case 'office':
      return 'Oficina';
    case 'finca':
      return 'Finca';
    case 'hotel':
      return 'Hotel';
    case 'cabin':
      return 'Cabaña';
    case 'plot':
      return 'Parcela';
    case 'studio':
      return 'Estudio';
    case 'local':
      return 'Local';
    default:
      return 'Propiedad';
  }
}

export function defineEventType(event: string): string {
  switch (event) {
    case 'sale':
      return 'Venta';
    case 'rent':
      return 'Arriendo';
    case 'sale_rent':
      return 'Venta/Arriendo';
    default:
      return 'Evento';
  }
}