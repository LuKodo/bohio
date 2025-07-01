import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/knex";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust as needed
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tipoInmueble, precioMin, precioMax, habitaciones, banos, areaMin, areaMax, parqueadero, type_service, cityId } = req.body;

  let query = db("product_template")

  if (type_service) query = query.where("type_service", type_service);
  if (cityId) query = query.where("city_id", cityId);
  if (tipoInmueble) query = query.where("property_type", tipoInmueble);
  if (precioMin) query = query.where("sale_value_from", ">=", precioMin);
  if (precioMax) query = query.where("sale_value_from", "<=", precioMax);
  if (habitaciones) query = query.where("num_bedrooms", habitaciones);
  if (banos) query = query.where("num_bathrooms", banos);
  if (areaMin) query = query.where("property_area", ">=", areaMin);
  if (areaMax) query = query.where("property_area", "<=", areaMax);
  if (parqueadero) query = query.where("common_parking", parqueadero === "true");

  // Add pagination
  const page = req.body.page || 1;
  const size = req.body.size || 10;
  query = query.offset((page - 1) * size).limit(size);

  try {
    const results = await query.select("*");
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Error fetching properties" });
  }
}
