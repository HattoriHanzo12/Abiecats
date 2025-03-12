const fs = require('fs');

// Trait options
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

// Inscription data
const transactionHash = "51716b37995b1ebaca198f4fd4409cfe3a4d84cdce712451dccde53955a19c76";
const inscriptionId = "88570716";

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
    element: "AbieCats.ab.0",
    inscriptionId: inscriptionId,
    blockHash: blockHash
  };
}

function generateAndSaveAbieCat(blockHash, catCounter) {
  if (!blockHash.includes("ab")) {
    console.log(`Block hash (field 0) does not contain 'ab' per AbieCats.ab.0 element for Inscription #${inscriptionId}. Cannot generate AbieCat.`);
    return null;
  }

  let seed = hashToSeed(blockHash);
  const abieCat = generateCat(blockHash, seed, catCounter);
  const jsonOutput = JSON.stringify(abieCat, null, 2);
  const filename = `abiecat_${catCounter}.json`;
  fs.writeFileSync(filename, jsonOutput);
  console.log(`Generated and saved AbieCat #${catCounter} to ${filename}:`, jsonOutput);
  return abieCat;
}

// Generate multiple AbieCats with different block hashes
const blockHashes = [
  "0000000000000000000021f390bf9826f1136cce623d2652b294ab3913e8562c", // Block 887224
  "00000000000000000001f06ca8ec578bb28666ab4fb8e61e500efae20ad37567", // Block 887206
  "000000000000000000016d4b5f242e6c607430edc50970599afabe1c5dd99129"  // Block 887203
];

blockHashes.forEach((hash, index) => {
  generateAndSaveAbieCat(hash, index);
});