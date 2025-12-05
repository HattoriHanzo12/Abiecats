require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PATTERN = "ab";
const OUTPUT_DIR = path.join(__dirname, "../tools/mint-output");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function getBlockHash(height) {
  try {
    const res = await axios.get(`https://blockstream.info/api/block-height/${height}`);
    const blockHash = res.data;
    const details = await axios.get(`https://blockstream.info/api/block/${blockHash}`);
    return { hash: blockHash, ...details.data };
  } catch (e) {
    return null;
  }
}

function hashToSeed(hash) {
  let seed = 0;
  for (let i = 0; i < hash.length; i += 2) {
    seed = (seed * 31 + parseInt(hash.substr(i, 2), 16)) >>> 0;
  }
  return seed;
}

function generateTraits(seed) {
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return {
    background: ["Cosmic", "Sunset", "Ocean", "Forest", "Void"][Math.floor(rand() * 5)],
    fur: ["Tabby", "Tiger", "Leopard", "Galaxy", "Ghost"][Math.floor(rand() * 5)],
    eyes: ["Emerald", "Sapphire", "Ruby", "Diamond", "Laser"][Math.floor(rand() * 5)],
    mouth: ["Smile", "Grin", "Meh", "Tongue", "Fang"][Math.floor(rand() * 5)],
    hat: rand() > 0.9 ? "Crown" : rand() > 0.8 ? "Wizard Hat" : "None",
    accessory: rand() > 0.95 ? "Bitcoin Chain" : "None"
  };
}

(async () => {
  const tipRes = await axios.get('https://blockstream.info/api/blocks/tip/height');
  const currentHeight = tipRes.data;
  console.log(`Scanning blocks 0 → ${currentHeight} for "ab" in blockhash...`);

  let found = 0;
  for (let h = 0; h <= currentHeight; h++) {
    if (h % 5000 === 0 && h > 0) console.log(`Checked ${h} blocks so far...`);
    const block = await getBlockHash(h);
    if (!block) continue;
    if (block.hash.includes(PATTERN)) {
      found++;
      const seed = hashToSeed(block.hash);
      const traits = generateTraits(seed);
      const mintJson = {
        p: "tap",
        op: "dmt-mint",
        dep: "PENDING_DEPLOY_ID",
        tick: "abiecats",
        blk: h.toString(),
        traits
      };
      fs.writeFileSync(path.join(OUTPUT_DIR, `AbieCat_${h}.json`), JSON.stringify(mintJson, null, 2));
      console.log(`FOUND #${found} → Block ${h} → ${traits.fur} ${traits.eyes} AbieCat`);
    }
  }
  console.log(`\nScan complete! Found ${found} AbieCats → ready for minting`);
})();