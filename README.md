# AbieCats: A Bitcoin Ordinals DMT Project

## Overview
AbieCats is a generative NFT project on Bitcoin Ordinals using the `AbieCats.ab.0` DMT element. The rule requires a block hash containing "ab" to mint unique *AbieCats*.

## Deploy Inscription
- ID: #88570716
- Link: https://ordiscan.com/inscription/88570716
- Content: Defines `AbieCats.ab.0` element.
- Block: 887040
- Inscription ID: 51716b37995b1ebaca198f4fd4409cfe3a4d84cdce712451dccde53955a19c76i0

## Minted NFTs
- #88749600 (mints/abiecat_0.json, ID: 5ce6f7fbdac88c105a34580f1e067056cb6ea6e6a609f2f709e2f29556752c25i0)
- ID: aacc45d8165fbf004a1e3b3c1ae9a0781cbabfcbd124f888402c0d80e5dd173fi0 (mints/abiecat_1.json)
- #09aa4e3fa73bd82414f5a578631329331323be21820dc2a1460d27c35e8a270ei0 (mints/abiecat_2.json)

## Installation
1. Install Node.js: https://nodejs.org
2. Clone this repo: `git clone https://github.com/venkyaare/abiecats.git`
3. Run: `cd src && node generateAbieCats.js`

## Usage
- Modify `blockHashes` in `src/generateAbieCats.js` with new "ab"-containing hashes.
- Inscribe generated `.json` files in `mints/` via Unisat Wallet.

## Visuals
Use p5.js (to be added in `visuals/` folder) to generate images based on traits.

## License
MIT License

## Contributing
Fork this repo, add new hashes, and submit pull requests!