import knex from "knex"
import "dotenv/config"

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "hdm",
    password: process.env.DB_PASSWORD || "helpdesk*2025",
    database: process.env.DB_NAME || "bohio",
    ssl: false,
  },
  useNullAsDefault: true,
})

export default db