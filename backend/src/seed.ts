import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO songs (hymn_number, title, lyrics, author, composer, instrument_url, duration_seconds)
       VALUES 
       (1,'Love Divine','Love divine, all loves excelling...', 'Charles Wesley','Rowland H. Prichard', NULL, 180),
       (2,'Amazing Grace','Amazing grace! how sweet the sound...', 'John Newton','Traditional', NULL, 200),
       (3,'Redeemed','Redeemed, how I love to proclaim it...', 'Fanny Crosby','William J. Kirkpatrick', NULL, 190)
       ON CONFLICT DO NOTHING;`
    );
    console.log("Seed data inserted");
  } finally {
    await client.end();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

