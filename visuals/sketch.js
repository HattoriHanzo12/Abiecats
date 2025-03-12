let catTraits = {
  headColor: [128, 0, 128],    // Purple
  bodyColor: [150, 255, 150],  // Light green
  earColor: [200, 200, 0],     // Yellow
  tailPos: "down",
  eyeSize: 70,
  eyeShape: "almond",
  eyeColor: [50, 205, 50],     // Green
  whiskerLength: 60,
  whiskerThickness: 1,
  noseSize: 18,
  mouthColor: [255, 105, 180], // Pink
  mouthExpression: "smile",
  pupilSize: 16,
  irisColor: [50, 205, 50],    // Green
  pupilDirection: "down"
};
  
  function setup() {
    createCanvas(400, 400);
    background(50, 50, 50);
    drawCat();
    saveCanvas('abiecat_0', 'png');
  }
  
  function draw() {
    // No continuous draw needed
  }
  
  function drawCat() {
    fill(catTraits.bodyColor);
    noStroke();
    ellipse(200, 300, 60, 80);
  
    fill(catTraits.earColor);
    triangle(140, 160, 180, 100, 220, 160);
    triangle(180, 160, 220, 100, 260, 160);
  
    fill(catTraits.headColor);
    ellipse(200, 200, 180, 180);
  
    stroke(catTraits.bodyColor);
    strokeWeight(3);
    if (catTraits.tailPos === "up") line(230, 300, 240, 280);
    else if (catTraits.tailPos === "down") line(230, 300, 240, 320);
    else if (catTraits.tailPos === "curled") arc(230, 300, 15, 15, 0, PI);
    else line(230, 300, 250, 300);
    noStroke();
  
    fill(255);
    if (catTraits.eyeShape === "round") {
      ellipse(160, 180, catTraits.eyeSize, catTraits.eyeSize);
      ellipse(240, 180, catTraits.eyeSize, catTraits.eyeSize);
    } else {
      drawAlmondEye(160, 180, catTraits.eyeSize);
      drawAlmondEye(240, 180, catTraits.eyeSize);
    }
    fill(catTraits.eyeColor);
    ellipse(160, 180, catTraits.eyeSize * 0.55, catTraits.eyeSize * 0.55);
    ellipse(240, 180, catTraits.eyeSize * 0.55, catTraits.eyeSize * 0.55);
    fill(0);
    let pupilOffset = catTraits.eyeSize * 0.15;
    let leftPupilX = 160, rightPupilX = 240, pupilY = 180;
    if (catTraits.pupilDirection === "left") {
      leftPupilX -= pupilOffset;
      rightPupilX -= pupilOffset;
    } else if (catTraits.pupilDirection === "right") {
      leftPupilX += pupilOffset;
      rightPupilX += pupilOffset;
    } else if (catTraits.pupilDirection === "up") pupilY -= pupilOffset;
    else if (catTraits.pupilDirection === "down") pupilY += pupilOffset;
    ellipse(leftPupilX, pupilY, catTraits.pupilSize, catTraits.pupilSize);
    ellipse(rightPupilX, pupilY, catTraits.pupilSize, catTraits.pupilSize);
  
    fill(50);
    ellipse(200, 230, catTraits.noseSize, catTraits.noseSize * 0.6);
  
    stroke(catTraits.mouthColor);
    strokeWeight(4);
    if (catTraits.mouthExpression === "smile") arc(200, 245, 30, 30, 0, PI);
    else if (catTraits.mouthExpression === "neutral") line(185, 250, 215, 250);
    else if (catTraits.mouthExpression === "smirk") arc(200, 245, 30, 30, 0, PI / 2);
    else ellipse(200, 250, 15, 20);
    noStroke();
  
    stroke(255);
    strokeWeight(catTraits.whiskerThickness);
    line(185, 235, 185 - catTraits.whiskerLength, 225);
    line(185, 245, 185 - catTraits.whiskerLength, 245);
    line(185, 255, 185 - catTraits.whiskerLength, 265);
    line(215, 235, 215 + catTraits.whiskerLength, 225);
    line(215, 245, 215 + catTraits.whiskerLength, 245);
    line(215, 255, 215 + catTraits.whiskerLength, 265);
    noStroke();
  }
  
  function drawAlmondEye(x, y, size) {
    beginShape();
    vertex(x - size / 2, y);
    bezierVertex(x - size / 4, y - size / 2, x + size / 4, y - size / 2, x + size / 2, y);
    bezierVertex(x + size / 4, y + size / 2, x - size / 4, y + size / 2, x - size / 2, y);
    endShape(CLOSE);
  }