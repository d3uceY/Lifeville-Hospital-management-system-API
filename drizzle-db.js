import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "dotenv";

env.config();

const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: false,
});


export const db = drizzle(pool, { casing: "snake_case" });
