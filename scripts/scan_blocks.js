const axios = require('axios');
const fs = require('fs');

// Blockstream Esplora API base URL (for Bitcoin Mainnet)
const API_BASE_URL = 'https://blockstream.info/api';

// Function to fetch a block hash by block height
async function getBlockHash(height) {
  try {
    const response = await axios.get(`${API_BASE_URL}/block-height/${height}`);
    const blockHash = response.data;
    return blockHash;
  } catch (error) {
    console.error(`Error fetching block hash for height ${height}:`, error.message);
    return null;
  }
}

// Function to fetch block details by block hash
async function getBlockDetails(blockHash) {
  try {
    const response = await axios.get(`${API_BASE_URL}/block/${blockHash}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching block details for hash ${blockHash}:`, error.message);
    return null;
  }
}

// Function to check if a block hash contains the "ab" pattern
function hasAbPattern(hash) {
  return hash.toLowerCase().includes('ab');
}

// Main function to scan blocks
async function scanBlocks(startHeight, endHeight) {
  const matches = [];
  console.log(`Scanning blocks from height ${startHeight} to ${endHeight}...`);

  for (let height = startHeight; height <= endHeight; height++) {
    // Fetch the block hash
    const blockHash = await getBlockHash(height);
    if (!blockHash) continue;

    // Check for "ab" pattern
    if (hasAbPattern(blockHash)) {
      // Fetch block details
      const blockDetails = await getBlockDetails(blockHash);
      if (blockDetails) {
        console.log(`Match found at height ${height}: ${blockHash}`);
        matches.push({
          height: height,
          hash: blockHash,
          timestamp: blockDetails.timestamp,
          hashSeed: calculateHashSeed(blockHash) // Add a hash seed for trait generation
        });
      }
    }

    // Optional: Add a delay to avoid hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
  }

  // Save matches to a file
  fs.writeFileSync('ab_pattern_matches.json', JSON.stringify(matches, null, 2));
  console.log(`Found ${matches.length} blocks with the "ab" pattern. Results saved to ab_pattern_matches.json`);
}

// Simple function to calculate a hash seed (for trait generation)
function calculateHashSeed(hash) {
  let sum = 0;
  for (let i = 0; i < hash.length; i++) {
    sum += hash.charCodeAt(i);
  }
  return sum % 1000000; // Arbitrary modulus to keep the seed manageable
}

// Run the script
const START_HEIGHT = 0; // Start from a block height (e.g., where your existing mint files start)
const END_HEIGHT = 890000;   // End at a block height (adjust based on your needs)

scanBlocks(START_HEIGHT, END_HEIGHT).catch(error => {
  console.error('Script failed:', error.message);
});