import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "dotenv";

env.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,

    // user: process.env.PG_USER,
    // host: process.env.PG_HOST,
    // database: process.env.PG_DATABASE,
    // password: process.env.PG_PASSWORD,
    // port: process.env.PG_PORT,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    ssl: true,
    //added for better pefomance
    max: 10, // Neon has connection limits
    min: 1,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    createRetryIntervalMillis: 2000,
});


pool.on("error", (err) => {
    console.error("unexpected idle client", err);
});


export const db = drizzle(pool, { casing: "snake_case" });
