require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, "../tools/mint-output");
const LOG_FILE = path.join(OUTPUT_DIR, ".last_scanned");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// CONFIG — CHANGE THESE
const DEPLOY_ID = "REPLACE_WITH_YOUR_DEPLOY_INSCRIPTION_ID";  // ← put your real deploy ID here after inscription
const GEN1_CAP = 10000;        // ← Gen 1 limited to first 10,000 valid blocks (like Natcats generations)
const START_FROM = fs.existsSync(LOG_FILE) ? parseInt(fs.readFileSync(LOG_FILE,'utf8')) + 1 : 0;

async function getBlockHash(height) {
  try {
    const res = await axios.get(`https://blockstream.info/api/block-height/${height}`, { timeout: 10000 });
    return res.data;
  } catch (e) {
    console.log(`Rate-limited at ${height}, waiting 3s...`);
    await new Promise(r => setTimeout(r, 3000));
    return getBlockHash(height);
  }
}

(async () => {
  const tip = (await axios.get('https://blockstream.info/api/blocks/tip/height')).data;
  const end = Math.min(tip, GEN1_CAP - 1);  // respect Gen 1 cap
  console.log(`AbieCats Scanner — Nat-Natcats Edition`);
  console.log(`Scanning blocks ${START_FROM} → ${end} for "ab" in blockhash...`);
  console.log(`Gen 1 cap: ${GEN1_CAP} | Deploy ID: ${DEPLOY_ID || "PENDING"}`);

  let found = 0;
  for (let h = START_FROM; h <= end; h++) {
    if (h % 5000 === 0 && h > 0) {
      console.log(`Checked ${h} blocks... (${found} found so far)`);
      fs.writeFileSync(LOG_FILE, h.toString()); // resume from here if stopped
    }
    const hash = await getBlockHash(h);
    if (hash && hash.includes("ab")) {
      found++;
      const json = {
        "p": "tap",
        "op": "dmt-mint",
        "dep": DEPLOY_ID || "PENDING_DEPLOY_ID",
        "tick": "abiecats",
        "blk": h.toString()
      };
      fs.writeFileSync(path.join(OUTPUT_DIR, `AbieCat_${h}.json`), JSON.stringify(json, null, 2));
      console.log(`Found #${found} → Block ${h}${h.toString().includes('69') ? " (69 STAR)" : ""}`);
    }
  }
  fs.writeFileSync(LOG_FILE, end.toString());
  console.log(`\nGen 1 scan complete! Found ${found} AbieCats → ready for minting`);
  console.log(`Output: ${OUTPUT_DIR}`);
})();
