import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema", // where the generated schema will go
  out: "./drizzle/migrations", 
  dialect: "postgresql", // new property instead of `driver`
  dbCredentials: {
    url: 'postgres://postgres:1001@localhost:5432/LIFEVILLE_HMS_db', 
  },
});
