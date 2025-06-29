import Link from "next/link"
import { Building2, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t px-4">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold text-red-600">Bohio Consultores</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              El portal inmobiliario líder en Colombia. Encuentra tu hogar ideal entre miles de opciones.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-red-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-red-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-red-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-red-600">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Inmuebles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Apartamentos en venta
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Casas en venta
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Apartamentos en arriendo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Casas en arriendo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Oficinas y locales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Proyectos nuevos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Ciudades</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Bogotá
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Medellín
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Cali
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Barranquilla
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Cartagena
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Bucaramanga
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Blog inmobiliario
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-red-600">
                  Trabaja con nosotros
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FincaraĂ­z. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
