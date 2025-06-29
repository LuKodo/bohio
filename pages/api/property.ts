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
  const { id } = req.body;

  let query = db("product_template")

  if (id) query = query.where("id", id);

  try {
    const results = await query.select("*");
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Error fetching properties" });
  }
}
