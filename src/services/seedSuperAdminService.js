import { query } from "../db.js";
import bcrypt from "bcrypt";

async function seedSuperAdmin() {
    const { rows } = await query("SELECT id FROM users WHERE role = 'superadmin' LIMIT 1");
    if (!rows.length) {
      const hash = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 12);
      await query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'superadmin')",
        [process.env.SUPERADMIN_EMAIL, hash]
      );
      console.log(`Superadmin ${process.env.SUPERADMIN_EMAIL} created.`);
    }
  }