# Abiecats - Digital Matter Theory Project

## Overview
Abiecats is a Digital Matter Theory (DMT) project that leverages the Bitcoin blockchain to create non-arbitrary tokens (NATs) based on the "ab" pattern in the `block_hash` field (field 0). Each token represents a unique digital collectible tied to blocks where the block hash contains "ab", inscribed as Ordinal Inscriptions. This project follows the DMT framework outlined in the [DMT GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory).

## Project Details
- **Pattern**: "ab" (hexadecimal, case-sensitive, must appear anywhere in the block hash)
- **Field**: `block_hash` (field 0 in the .element registry)
- **Element Inscription**: `Abiecats.ab.0.element`
- **Element Inscription ID**: `404d96addddfa6fc8c18d6af83b081fd04501a4d8c97909301116a7359dfcf58i0`
- **Purpose**: Create a collection of digital collectibles with traits derived from Bitcoin block data, ensuring authenticity through blockchain patterns.
- **Total Supply**: Determined by the number of blocks where the `block_hash` contains "ab".

## Setup and Usage
### Prerequisites
- Node.js and npm installed
- An Ordinals-compatible wallet (e.g., Xverse, Unisat, or Ordinals Wallet)
- Bitcoin testnet or mainnet access for inscriptions
- Familiarity with the [TAP protocol](https://digital-matter-theory.gitbook.io/digital-matter-theory) and Ordinal Inscriptions

### Steps to Deploy Abiecats
1. **Identify and Verify the Pattern**:
   - The "ab" pattern is chosen for the `block_hash` field, ensuring it is unique and not registered by another project. Check existing .element inscriptions via platforms like [Mscribe.io](https://mscribe.io/) or community resources (e.g., DMT GitHub, X posts).
   - The pattern "ab" must appear anywhere in the `block_hash`. Validate matching blocks using blockchain data analysis tools.

2. **Register the .element Inscription**:
   - The .element inscription for this project is `Abiecats.ab.0.element`, which has already been inscribed on the Bitcoin blockchain.
   - **Inscription ID**: `404d96addddfa6fc8c18d6af83b081fd04501a4d8c97909301116a7359dfcf58i0`
   - This inscription is indexed by services like Trac Core or Mscribe.io for recognition in the .element registry.

3. **Generate Inscription JSON Files**:
   - The `src/generateAbieCats.js` script identifies blocks where the `block_hash` contains the "ab" pattern and generates two JSON files per token:
     - A `dmt-mint` JSON for minting the token (e.g., `mint/abiecat_0_mint.json`).
     - A metadata JSON with token attributes (e.g., `mint/abiecat_0_metadata.json`).
   - Run the script:
     ```bash
     npm install
     node src/generateAbieCats.js
     ```
   - This populates the `mint/` folder with JSON files for each token (e.g., `abiecat_0_mint.json`, `abiecat_0_metadata.json`).

4. **Deploy the NAT**:
   - Deploy the NAT using the TAP protocol's `dmt-deploy` operation, referencing the .element `inscriptionID`.
   - Example JSON for deployment:
     ```json
     {
       "p": "tap",
       "op": "dmt-deploy",
       "elem": "404d96addddfa6fc8c18d6af83b081fd04501a4d8c97909301116a7359dfcf58i0",
       "tick": "ABIECATS",
       "dim": "horizontal",
       "dt": "hex"
     }
     ```
   - Inscribe this JSON as an Ordinal Inscription to initialize the project.
   - Verify the deployment on platforms like Mscribe.io.

5. **Mint Tokens**:
   - Mint tokens for each valid block where the `block_hash` contains the "ab" pattern using the generated `dmt-mint` JSON files.
   - Example mint JSON (e.g., `mint/abiecat_0_mint.json`):
     ```json
     {
       "p": "tap",
       "op": "dmt-mint",
       "tick": "ABIECATS",
       "blk": "125003"
     }
     ```
   - Inscribe each mint JSON to create a token tied to a specific block.
   - Separately, inscribe the metadata JSON (e.g., `mint/abiecat_0_metadata.json`) to associate attributes with the token:
     ```json
     {
       "instance": 0,
       "blk": "125003",
       "hash": "000000000000021a37be00b72bef47fdb2abecc2f2870a6834c2f461012d56af",
       "hashSeed": 175821,
       "headColor": [50, 205, 50],
       "bodyColor": [150, 255, 150],
       "earColor": [0, 150, 255],
       "tailPos": "curled",
       "eyeSize": 60,
       "eyeShape": "round",
       "eyeColor": [50, 205, 50],
       "whiskerLength": 50,
       "whiskerThickness": 3,
       "noseSize": 14,
       "mouthColor": [0, 0, 0],
       "mouthExpression": "neutral",
       "pupilSize": 8,
       "irisColor": [255, 215, 0],
       "pupilDirection": "down"
     }
     ```

## Contributing
Contributions are welcome! Please submit issues or pull requests for bug fixes, new

 features, or documentation improvements.

## Resources
- [Digital Matter Theory GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory)
- [Abiecats GitHub Repository](https://github.com/HattoriHanzo12/Abiecats)
- [Mscribe.io for NAT Management](https://mscribe.io/)
- [The Royals DMT Example](https://the-royals.gitbook.io/theroyals)

## License
MIT License