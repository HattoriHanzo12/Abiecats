# AbieCats

AbieCats is a generative art project built on Bitcoin Ordinals, utilizing Digital Matter Theory (DMT) to create unique digital cats based on patterns in Bitcoin block hashes. The collection is named `AbieCats` (as defined by the inscribed deploy file with `"elem": "AbieCats.ab.0"`), with the ticker `abiecats`.

## Digital Matter Theory (DMT) Implementation
AbieCats leverages DMT to generate unique digital assets by analyzing patterns in Bitcoin block data. Specifically, AbieCats uses the "ab" pattern in block hashes to deterministically generate traits for each cat. The rendering logic and metadata are inscribed on-chain, ensuring authenticity and transparency, following DMT principles as outlined in the [DMT GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory).

### Pattern Selection
- **Pattern**: "ab" in Bitcoin block hashes.
- **Process**: Block hashes are analyzed to find instances of the "ab" pattern. Each matching block generates a unique AbieCat with traits derived from the hash using a seeded random function (`hashToSeed`).

### On-Chain Rendering
AbieCats uses on-chain rendering to dynamically generate images in DMT-compatible wallets. The rendering logic is implemented in `AbieCat_renderer.js`, a JavaScript file inscribed on the Bitcoin blockchain. This script uses the HTML5 Canvas API to render each cat based on its traits, ensuring the image is generated directly from the blockchain data.

- **Renderer Inscription**: The rendering logic (`AbieCat_renderer.js`) is inscribed at ID `abc123i0`.
- **Rendering Process**: Wallets like Unisat Wallet or Ordinals Wallet load the renderer and metadata, calling the `renderAbieCat` function with the cat's traits to display the image.

## UNAT Standard Implementation
AbieCats follows the Unique Non-Arbitrary Token (UNAT) standard, combining Non-Arbitrary Tokens (NATs) with unique art, as defined in the [DMT GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory/introduction/non-arbitrary-tokens-nats). The UNAT standard ensures that each AbieCat is a unique, blockchain-verifiable asset with on-chain rendering.

### UNAT Metadata Structure
The AbieCats collection is deployed with a `"dmt-deploy"` operation, which defines the collection and includes the traits for the first item (`instance: 0`, i.e., `AbieCat_0`). Subsequent items are minted with `"token-mint"` operations, inscribed as JSON files in the `mint/` directory, following the TAP protocol (`"p": "tap"`). The metadata includes:
- **Protocol Fields**:
  - Deploy: `"p": "tap"`, `"op": "dmt-deploy"`, `"tick": "abiecats"`, `"elem": "AbieCats.ab.0"`, `"instance"`.
  - Mint: `"p": "tap"`, `"op": "token-mint"`, `"tick": "abiecats"`, `"elem": "AbieCats.ab.0"`, `"instance"`.
- **Rendering Reference**: `"art"` field in mint files pointing to the renderer inscription ID (`abc123i0`).
- **Traits**: Attributes (e.g., `headColor`, `eyeSize`, `mouthExpression`) used by the renderer, stored directly in the root object for consistency with the deploy operation.

### Inscription Process
1. **Inscribe Deploy File**: The deploy file (defining the collection and `AbieCat_0`) has been inscribed on the Bitcoin Mainnet using Unisat Wallet, resulting in inscription ID `deploy_id`.
2. **Inscribe Renderer**: The `AbieCat_renderer.js` file is inscribed, resulting in inscription ID `abc123i0`.
3. **Inscribe Metadata**: Each subsequent AbieCat's metadata JSON file is inscribed, referencing the renderer ID. For example:
   - `AbieCat_1.json` is inscribed at `new_id_1i0`.
   - `AbieCat_2.json` is inscribed at `new_id_2i0`.

## Project Details
- **Protocol**: TAP (DMT)
- **Ticker**: `abiecats`
- **Collection Name**: `AbieCats` (as defined by `"elem": "AbieCats.ab.0"`)
- **Deploy File (defines collection and AbieCat_0)**:
  - Block Height (Target): 125003
  - Actual Block Height: 887528
  - Inscription ID: `deploy_id`
  - Block Hash: `000000000000021a37be00b72bef47fdb2abecc2f2870a6834c2f461012d56af`
  - elem: `AbieCats.ab.0`, instance: 0
- **Mint File 1**: `mint/AbieCat_1.json`
  - Block Height (Target): 125004
  - Actual Block Height: 887528
  - Inscription ID: `new_id_1i0`
  - Rendering ID: `abc123i0`
  - Block Hash: `00000000000041fd154f86996ee479270b4cee8a43bab8738b417a3f1d68bf27`
  - elem: `AbieCats.ab.0`, instance: 1
- **Mint File 2**: `mint/AbieCat_2.json`
  - Block Height (Target): 125006
  - Actual Block Height: 887528
  - Inscription ID: `new_id_2i0`
  - Rendering ID: `abc123i0`
  - Block Hash: `000000000000148135e10208db85abb62754341a392eab1f186aab077a831cf7`
  - elem: `AbieCats.ab.0`, instance: 2

## Installation
To view AbieCats, use a DMT-compatible wallet like Unisat Wallet or Ordinals Wallet, and load the inscription IDs listed above.

## Usage
AbieCats are dynamically rendered in your wallet using the on-chain JavaScript renderer. Each cat is generated based on traits derived from Bitcoin block hashes containing the "ab" pattern.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

