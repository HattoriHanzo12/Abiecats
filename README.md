# AbieCats – Nat-Natcats

On-chain SVG cats born from the **"ab"** pattern in Bitcoin blockhashes.  
Permissionless minting. 10,000 Gen 1 cap. 69 star catnip.

### Supply & Rarity
- Pattern: `"ab"` substring in **blockhash field 0** (DMT/TAP)
- Gen 1: first 10,000 valid blocks only
- Future blocks = future generations

### Special Trait
- Block number contains **69** → glowing golden star

### Tools
- Live previewer: [viewer/index.html](viewer/index.html)
- Mint JSON generator: `node src/scanner.js` → `tools/mint-output/`

### How to Mint
1. Find an unminted block with "ab" in its hash  
2. Preview your cat  
3. Inscribe the `dmt-mint` JSON for that block  
4. Done — forever on Bitcoin

### Inscriptions
- Element → `inscriptions/element.json`
- Deploy → `inscriptions/deploy.json`  
  ID: `842cb4e670e9afd212e38493c3da68dda9d2885af1604a23de4cea2d9f29e737i0`
- Renderer → `src/AbieCat_renderer.js`

**AbieCats – Nat-Natcats**  
Now live on Bitcoin.

