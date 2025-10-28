// scripts/fetch-and-save.js
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const base = process.env.VITE_API_BASE;
const key = process.env.VITE_API_KEY;

const team = process.argv[2] || 'Arsenal';
const url = `${base}/${key}/searchteams.php?t=${encodeURIComponent(team)}`;

async function main() {
  console.log('Fetching:', url);
  const res = await fetch(url);
  const json = await res.json();
  fs.mkdirSync('public/data', { recursive: true });
  fs.writeFileSync('public/data/teams.json', JSON.stringify(json, null, 2));
  console.log('✅ Saved to public/data/teams.json');
}

main();
