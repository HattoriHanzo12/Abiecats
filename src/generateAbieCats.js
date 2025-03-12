const fs = require('fs');

// Trait options (unchanged)
const headColors = [[255, 182, 193], [139, 69, 19], [50, 205, 50], [255, 215, 0], [128, 0, 128], [0, 191, 255]];
const bodyColors = [[200, 150, 150], [100, 50, 0], [150, 255, 150], [255, 255, 150], [200, 100, 200], [150, 200, 255]];
const earColors = [[255, 100, 100], [80, 40, 20], [0, 150, 0], [200, 200, 0], [150, 0, 150], [0, 150, 255]];
const tailPositions = ["up", "down", "curled", "straight"];
const eyeSizes = [50, 60, 70];
const eyeShapes = ["round", "almond"];
const eyeColors = [[0, 191, 255], [50, 205, 50], [255, 105, 180], [255, 215, 0], [139, 69, 19]];
const whiskerLengths = [40, 50, 60];
const whiskerThicknesses = [1, 2, 3];
const noseSizes = [14, 18, 22];
const mouthColors = [[255, 105, 180], [255, 0, 0], [0, 0, 0]];
const mouthExpressions = ["smile", "neutral", "smirk", "open"];
const pupilSizes = [8, 12, 16];
const irisColors = [[255, 215, 0], [0, 191, 255], [50, 205, 50], [255, 105, 180]];
const pupilDirections = ["left", "right", "up", "down"];

// New block hashes for 'ab' pattern
const blockHashes = [
  "000000000000021a37be00b72bef47fdb2abecc2f2870a6834c2f461012d56af", // Block 125003
  "00000000000041fd154f86996ee479270b4cee8a43bab8738b417a3f1d68bf27", // Block 125004
  "000000000000148135e10208db85abb62754341a392eab1f186aab077a831cf7"  // Block 125006
];

function hashToSeed(hashStr) {
  let sum = 0;
  for (let char of hashStr) sum += char.charCodeAt(0);
  return sum % 1000;
}

function generateCat(blockHash, seed, catCounter) {
  function seededRandom(max) {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.floor(seed / 233280 * max);
  }

  let headColor = headColors[seededRandom(headColors.length)];
  let bodyColor = bodyColors[seededRandom(bodyColors.length)];
  let earColor = earColors[seededRandom(earColors.length)];
  let tailPos = tailPositions[seededRandom(tailPositions.length)];
  let eyeSize = eyeSizes[seededRandom(eyeSizes.length)];
  let eyeShape = eyeShapes[seededRandom(eyeShapes.length)];
  let eyeColor = eyeColors[seededRandom(eyeColors.length)];
  let whiskerLength = whiskerLengths[seededRandom(whiskerLengths.length)];
  let whiskerThickness = whiskerThicknesses[seededRandom(whiskerThicknesses.length)];
  let noseSize = noseSizes[seededRandom(noseSizes.length)];
  let mouthColor = mouthColors[seededRandom(mouthColors.length)];
  let mouthExpression = mouthExpressions[seededRandom(mouthExpressions.length)];
  let pupilSize = pupilSizes[seededRandom(pupilSizes.length)];
  let irisColor = irisColors[seededRandom(irisColors.length)];
  let pupilDirection = pupilDirections[seededRandom(pupilDirections.length)];

  return {
    headColor,
    bodyColor,
    earColor,
    tailPos,
    eyeSize,
    eyeShape,
    eyeColor,
    whiskerLength,
    whiskerThickness,
    noseSize,
    mouthColor,
    mouthExpression,
    pupilSize,
    irisColor,
    pupilDirection,
    hashSeed: seed,
    blockHash: blockHash
  };
}

function generateAndSaveAbieCat(blockHash, catCounter) {
  if (!blockHash.includes("ab")) {
    console.log(`Block hash does not contain 'ab' for AbieCat #${catCounter}. Skipping generation.`);
    return null;
  }

  let seed = hashToSeed(blockHash);
  const baseCat = generateCat(blockHash, seed, catCounter);

  // TAP/DMT structure
  const abieCat = {
    p: "tap",
    op: catCounter === 0 ? "dmt-deploy" : "dmt-mint",
    elem: `AbieCats.ab.${catCounter}`,
    tick: "abiecats",
    blk: catCounter === 0 ? "125003" : catCounter === 1 ? "125004" : "125006",
    hash: blockHash,
    ...baseCat
  };

  const jsonOutput = JSON.stringify(abieCat, null, 2);
  const filename = `mint/abiecat_${catCounter}.json`;
  fs.writeFileSync(filename, jsonOutput);
  console.log(`Generated and saved AbieCat #${catCounter} to ${filename}:`, jsonOutput);
  return abieCat;
}

// Generate AbieCats with new block hashes
blockHashes.forEach((hash, index) => {
  generateAndSaveAbieCat(hash, index);
});