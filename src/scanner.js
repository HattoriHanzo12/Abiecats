require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, "../tools/mint-output");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function getBlockHash(height) {
  const res = await axios.get(`https://blockstream.info/api/block-height/${height}`);
  return res.data;
}

(async () => {
  const tip = (await axios.get('https://blockstream.info/api/blocks/tip/height')).data;
  console.log(`Scanning blocks 0 → ${tip} for "ab" in blockhash...`);
  let found = 0;
  for (let h = 0; h <= tip; h++) {
    if (h % 10000 === 0) console.log(`Checked ${h}...`);
    const hash = await getBlockHash(h);
    if (hash.includes("ab")) {
      found++;
      const json = {
        "p": "tap",
        "op": "dmt-mint",
        "dep": "PENDING_DEPLOY_ID",     // ← replace after you inscribe deploy
        "tick": "abiecats",
        "blk": h.toString()
      };
      fs.writeFileSync(path.join(OUTPUT_DIR, `AbieCat_${h}.json`), JSON.stringify(json, null, 2));
      console.log(`Found #${found} → Block ${h}`);
    }
  }
  console.log(`\nDone! Found ${found} AbieCats → ready for minting`);
})();
