import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { Client } from "pg";

dotenv.config();

async function run() {
  const sql = readFileSync(join(__dirname, "../migrations/001_init.sql"), "utf8");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query(sql);
    console.log("Migration applied");
  } finally {
    await client.end();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

