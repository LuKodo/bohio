import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { PropertyList } from "@/components/property-list";
import { Footer } from "@/components/footer";
import useSWR from "swr";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const fetchCitiesAndStates = (url: string) => fetch(url)
    .then(async (res) => {
      return await res.json()
    })
  const { data: citiesAndStates } = useSWR('/api/cities-and-states', fetchCitiesAndStates)

  return (
    <>
      <SpeedInsights />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
            <div
              className="h-[400px] bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
            />
            <div className="container absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-3xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Encuentra tu hogar ideal</h1>
                <Search citiesAndStates={citiesAndStates} />
              </div>
            </div>
          </section>

          <section className="container py-12 px-12">
            <h2 className="text-2xl font-bold mb-6">Propiedades destacadas</h2>
            <PropertyList />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
