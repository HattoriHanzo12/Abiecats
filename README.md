# AbieCats – Nat-Natcats

**The spiritual successor to Natcats.**  
Same exact SVG renderer. Same permissionless minting. Same on-chain purity.  
But instead of "3b" in bits… we hunt **"ab"** in the blockhash — and our catnip is **69**.

> “Natcats, but make it double negative.”  
> — literally everyone on Ordinals Twitter tomorrow

### Supply & Rarity
- Pattern: `"ab"` substring in **blockhash field 0** (DMT/TAP)
- Estimated historical supply: 900k+  
  → **Gen 1 capped at 10,000** for actual scarcity (first-come-first-served)
- Future blocks = future generations (just like Natcats)

### Special Trait
- If the block number contains **69** → glowing golden star (our version of catnip)

### Tools
- Live previewer: [viewer/index.html](viewer/index.html)
- Mint JSON generator: `node src/scanner.js` → outputs to `tools/mint-output/`

### How to Mint (Natcats style)
1. Find an unminted block with "ab" in its hash  
2. Preview your cat in the viewer  
3. Inscribe a `dmt-mint` JSON pointing to that block  
4. Done — 100 % on-chain forever

### Inscriptions (being inscribed today)
- Element: `inscriptions/element.json`  
- Deploy: `inscriptions/deploy.json`  
- Renderer: `src/AbieCat_renderer.js` (recursive)

**AbieCats – because not all cats are Natcats…  
but these ones are Nat-Natcats.**

X & Discord drop on launch.  
Get ready.

