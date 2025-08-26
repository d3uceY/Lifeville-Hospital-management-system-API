import pg from "pg";

import env from "dotenv";

env.config();
//define the values for the database parameters
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // user: process.env.PG_USER,
  // host: process.env.PG_HOST,
  // database: process.env.PG_DATABASE,
  // password: process.env.PG_PASSWORD,
  // port: process.env.PG_PORT,
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  min: 1, // keeps at least one “warm” connection
  idleTimeoutMillis: 20000, // closes idle connections cleanly
  ssl: true
});

//connect db
db.connect();

//error handling
db.on("error", (err) => {
  console.error("unexpected idle client", err);
});

export const query = (text, params) => db.query(text, params);
