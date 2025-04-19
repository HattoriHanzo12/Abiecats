# Abiecats - Digital Matter Theory Project

## Overview
Abiecats is a Digital Matter Theory (DMT) project that leverages the Bitcoin blockchain to create non-arbitrary tokens (NATs) based on the "ab" pattern in the `block_hash` field (field 0). Each token represents a unique digital collectible tied to blocks where the block hash ends with "ab", inscribed as Ordinal Inscriptions. This project follows the DMT framework outlined in the [DMT GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory).

## Project Details
- **Pattern**: "ab" (hexadecimal, case-sensitive)
- **Field**: `block_hash` (field 0 in the .element registry)
- **Element Inscription**: `Abiecats.ab.0.element`
- **Element Inscription ID**: `404d96addddfa6fc8c18d6af83b081fd04501a4d8c97909301116a7359dfcf58i0`
- **Purpose**: Create a collection of digital collectibles with traits derived from Bitcoin block data, ensuring authenticity through blockchain patterns.
- **Total Supply**: Approximately 3,125 tokens (based on the probability of "ab" in block hashes, 1/256, across ~800,000 blocks).

## Setup and Usage
### Prerequisites
- Node.js and npm installed
- An Ordinals-compatible wallet (e.g., Xverse, Unisat, or Ordinals Wallet)
- Bitcoin testnet or mainnet access for inscriptions
- Familiarity with the [TAP protocol](https://digital-matter-theory.gitbook.io/digital-matter-theory) and Ordinal Inscriptions

### Steps to Deploy Abiecats
1. **Identify and Verify the Pattern**:
   - The "ab" pattern is chosen for the `block_hash` field, ensuring it is unique and not registered by another project. Check existing .element inscriptions via platforms like [Mscribe.io](https://mscribe.io/) or community resources (e.g., DMT GitHub, X posts).
   - Validate the pattern's frequency using blockchain data analysis tools to estimate supply.

2. **Register the .element Inscription**:
   - The .element inscription for this project is `Abiecats.ab.0.element`, which has already been inscribed on the Bitcoin blockchain.
   - **Inscription ID**: `404d96addddfa6fc8c18d6af83b081fd04501a4d8c97909301116a7359dfcf58i0`
   - This inscription is indexed by services like Trac Core or Mscribe.io for recognition in the .element registry.

3. **Generate Inscription JSON Files**:
   - Run the provided script to identify blocks with the "ab" pattern in `block_hash`:
     ```bash
     npm install
     node index.js
     ```
   - This generates JSON files in the `inscriptions` folder, each containing metadata for a token (e.g., block height, hash, traits).

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
   - Mint tokens for each valid block matching the "ab" pattern.
   - Use the generated JSON files to create inscriptions for each token, ensuring they reference the NAT deployment.
   - Example mint JSON:
     ```json
     {
       "p": "tap",
       "op": "dmt-mint",
       "tick": "ABIECATS",
       "blk": "<block_height>"
     }
     ```
   - Inscribe each mint JSON to create a token tied to a specific block.

## Contributing
Contributions are welcome! Please submit issues or pull requests for bug fixes, new features, or documentation improvements.

## Resources
- [Digital Matter Theory GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory)
- [Abiecats GitHub Repository](https://github.com/HattoriHanzo12/Abiecats)
- [Mscribe.io for NAT Management](https://mscribe.io/)
- [The Royals DMT Example](https://the-royals.gitbook.io/theroyals)

## License
MIT License