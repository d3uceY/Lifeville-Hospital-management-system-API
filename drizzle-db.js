import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "dotenv";

env.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PRODUCTION === "true" ? true : false,
  max: 5,              
  min: 1,
  idleTimeoutMillis: 10000, 
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("Unexpected idle client error:", err);
});

export const db = drizzle(pool, { casing: "snake_case" });


export const query = (text, params) => pool.query(text, params);
