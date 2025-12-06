require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, "../tools/mint-output");
const LOG_FILE = path.join(OUTPUT_DIR, ".last_scanned");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DEPLOY_ID = "842cb4e670e9afd212e38493c3da68dda9d2885af1604a23de4cea2d9f29e737i0";
const GEN1_CAP = 10000;
const START_FROM = fs.existsSync(LOG_FILE) ? parseInt(fs.readFileSync(LOG_FILE,'utf8')) + 1 : 0;

async function getBlockHash(height) {
  try {
    const res = await axios.get(`https://blockstream.info/api/block-height/${height}`, { timeout: 10000 });
    return res.data;
  } catch (e) {
    if (e.response?.status === 429) {
      console.log(`Rate-limited at ${height}, waiting 60s...`);
      await new Promise(r => setTimeout(r, 60000));
    } else {
      console.log(`Error at ${height}, retrying in 3s...`);
      await new Promise(r => setTimeout(r, 3000));
    }
    return getBlockHash(height);
  }
}

(async () => {
  const tip = (await axios.get('https://blockstream.info/api/blocks/tip/height')).data;
  const end = Math.min(tip, GEN1_CAP - 1);
  console.log(`AbieCats Scanner — Nat-Natcats Edition`);
  console.log(`Scanning blocks ${START_FROM} → ${end}...`);

  let found = 0;
  for (let h = START_FROM; h <= end; h++) {
    if (h % 5000 === 0 && h > 0) {
      console.log(`Checked ${h} blocks... (${found} found)`);
      fs.writeFileSync(LOG_FILE, h.toString());
    }
    const hash = await getBlockHash(h);
    if (hash && hash.includes("ab")) {
      found++;
      const json = {
        "p": "tap",
        "op": "dmt-mint",
        "dep": DEPLOY_ID,
        "tick": "abiecats",
        "blk": h.toString()
      };
      fs.writeFileSync(path.join(OUTPUT_DIR, `AbieCat_${h}.json`), JSON.stringify(json, null, 2));
      console.log(`Found #${found} → Block ${h}${h.toString().includes('69') ? " 69 STAR" : ""}`);
    }
  }
  fs.writeFileSync(LOG_FILE, end.toString());
  console.log(`\nDone! ${found} AbieCats ready → tools/mint-output/`);
})();
