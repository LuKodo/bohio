import knex from "knex"
import "dotenv/config"

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "159.89.155.218",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "external",
    password: process.env.DB_PASSWORD || "bohio2025",
    database: process.env.DB_NAME || "inmobiliariabohio.cloudpepper.site",
    ssl: false,
  },
  useNullAsDefault: true,
})

export default db