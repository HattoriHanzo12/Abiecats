# AbieCats – Nat-Natcats

**AbieCats are the spiritual successor to Natcats**  
Same on-chain SVG magic. Same block-based emergence. Same permissionless minting.  
But with "ab" in the blockhash instead of "3b"… and a cheeky 69 star instead of 420 catnip.

> "Natcats, but make it double negative."  
> — the entire Ordinals timeline, probably

### Supply & Rarity
- Pattern: "ab" substring in blockhash field 0 (DMT/TAP)
- Estimated historical supply: ~900k+ (we will cap Gen 1 at 10,000 for scarcity)
- Future blocks = future drops (just like Natcats generations)

### Special Trait
- If the block number contains **69** → glowing golden star (our version of catnip)

### Tools
- Live previewer: [viewer/index.html](viewer/index.html)
- Mint JSON generator: `node src/scanner.js` (outputs to `tools/mint-output/`)

### How to Mint
1. Find an unminted block with "ab" in its hash
2. Use the previewer to see your cat
3. Inscribe a `dmt-mint` JSON pointing to that block
4. Done — fully on-chain, forever.

### Inscriptions (coming today)
- Element inscription → `inscriptions/element.json`
- Deploy inscription → `inscriptions/deploy.json`
- Renderer → `src/AbieCat_renderer.js` (recursive)

**AbieCats – because not all cats are Natcats… but these ones are Nat-Natcats.**

Discord & X coming on launch. Stay tuned.
