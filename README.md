# Abiecats - DMT/TAP Project

Abiecats is a Digital Matter Theory (DMT) project inscribed on Bitcoin using the TAP protocol, targeting block hashes with the 'ab' pattern.

## Project Details
- **Protocol**: TAP (DMT)
- **Ticker**: `abiecats`
- **Deploy File**: `mint/abiecat_0.json`
  - Block Height: 125003
  - Block Hash: `000000000000021a37be00b72bef47fdb2abecc2f2870a6834c2f461012d56af`
- **Mint File 1**: `mint/abiecat_1.json`
  - Block Height: 125004
  - Block Hash: `00000000000041fd154f86996ee479270b4cee8a43bab8738b417a3f1d68bf27`
- **Mint File 2**: `mint/abiecat_2.json`
  - Block Height: 125006
  - Block Hash: `000000000000148135e10208db85abb62754341a392eab1f186aab077a831cf7`

## Repository Structure
- `mint/`: Contains deployment and mint JSON files.
- `src/`: Contains `generateAbieCats.js` for generation logic.
- `visuals/`: For visual assets (currently empty).

## GitHub Setup Screenshot
![GitHub Setup](github_setup_screenshot.png)
*Screenshot of the repository structure as of March 12, 2025.*

## How to Inscribe
1. Use an Ordinals-compatible tool (e.g., `ord` CLI or Unisat wallet) that supports TAP/DMT.
2. Inscribe `mint/abiecat_0.json` first, then `mint/abiecat_1.json` and `mint/abiecat_2.json`.
3. Verify on [Ordiscan](https://ordiscan.com).

## Development
- **Environment**: MacBook Pro, VSCode
- **Last Updated**: March 12, 2025