import pg from "pg";

import env from "dotenv";

env.config();
//define the values for the database parameters
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

//connect db
db.connect(); 

//error handling
db.on("error", (err) => {
  console.error("unexpected idle client", err);
  process.exit(-1);
}); 
   
export const query = (text, params) => db.query(text, params);
   