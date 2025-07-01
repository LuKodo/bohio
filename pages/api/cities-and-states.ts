import { NextApiRequest, NextApiResponse } from "next"
import db from "@/lib/knex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const enabledCities = await db("product_template")
            .select("city_id")
            .distinct()

        const availabledCities = await db("res_city")
            .select("id", "name", "state_id")
            .whereIn("id", enabledCities.map((city: any) => city.city_id))

        const availableStates = await db("res_country_state")
            .select("id", "name")
            .whereIn("id", availabledCities.map((city: any) => city.state_id))

        const result = availabledCities.map((city: any) => {
            const state = availableStates.find((state: any) => state.id === city.state_id)
            return {
                id: city.id,
                name: city.name,
                state: {
                    id: state.id,
                    name: state.name
                }
            }
        })

      return res.status(200).json({ cities: result })
    } catch (error: any) {
      return res.status(500).json({ message: "Error al cargar ciudades y estados", error: error.message })
    }
}
