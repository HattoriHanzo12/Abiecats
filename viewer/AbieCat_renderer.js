function renderAbieCat(traits, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;

  // Background
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.fillRect(0, 0, 400, 400);

  // Body
  ctx.fillStyle = `rgb(${traits.bodyColor.join(",")})`;
  ctx.beginPath();
  ctx.ellipse(200, 300, 60, 80, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = `rgb(${traits.earColor.join(",")})`;
  ctx.beginPath();
  ctx.moveTo(140, 160);
  ctx.lineTo(180, 100);
  ctx.lineTo(220, 160);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(180, 160);
  ctx.lineTo(220, 100);
  ctx.lineTo(260, 160);
  ctx.closePath();
  ctx.fill();

  // Head
  ctx.fillStyle = `rgb(${traits.headColor.join(",")})`;
  ctx.beginPath();
  ctx.ellipse(200, 200, 90, 90, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail
  ctx.strokeStyle = `rgb(${traits.bodyColor.join(",")})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (traits.tailPos === "up") {
    ctx.moveTo(230, 300);
    ctx.lineTo(240, 280);
  } else if (traits.tailPos === "down") {
    ctx.moveTo(230, 300);
    ctx.lineTo(240, 320);
  } else if (traits.tailPos === "curled") {
    ctx.arc(230, 300, 15, 0, Math.PI);
  } else {
    ctx.moveTo(230, 300);
    ctx.lineTo(250, 300);
  }
  ctx.stroke();

  // Eyes
  function drawAlmondEye(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.bezierCurveTo(x - size / 4, y - size / 2, x + size / 4, y - size / 2, x + size / 2, y);
    ctx.bezierCurveTo(x + size / 4, y + size / 2, x - size / 4, y + size / 2, x - size / 2, y);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "rgb(255,255,255)";
  if (traits.eyeShape === "round") {
    ctx.beginPath();
    ctx.ellipse(160, 180, traits.eyeSize, traits.eyeSize, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(240, 180, traits.eyeSize, traits.eyeSize, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    drawAlmondEye(160, 180, traits.eyeSize);
    drawAlmondEye(240, 180, traits.eyeSize);
  }

  // Iris
  ctx.fillStyle = `rgb(${traits.irisColor.join(",")})`;
  ctx.beginPath();
  ctx.ellipse(160, 180, traits.eyeSize * 0.55, traits.eyeSize * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(240, 180, traits.eyeSize * 0.55, traits.eyeSize * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pupils
  ctx.fillStyle = "rgb(0,0,0)";
  let pupilOffset = traits.eyeSize * 0.15;
  let leftPupilX = 160, rightPupilX = 240, pupilY = 180;
  if (traits.pupilDirection === "left") {
    leftPupilX -= pupilOffset;
    rightPupilX -= pupilOffset;
  } else if (traits.pupilDirection === "right") {
    leftPupilX += pupilOffset;
    rightPupilX += pupilOffset;
  } else if (traits.pupilDirection === "up") pupilY -= pupilOffset;
  else if (traits.pupilDirection === "down") pupilY += pupilOffset;
  ctx.beginPath();
  ctx.ellipse(leftPupilX, pupilY, traits.pupilSize, traits.pupilSize, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(rightPupilX, pupilY, traits.pupilSize, traits.pupilSize, 0, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.beginPath();
  ctx.ellipse(200, 230, traits.noseSize, traits.noseSize * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mouth
  ctx.strokeStyle = `rgb(${traits.mouthColor.join(",")})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (traits.mouthExpression === "smile") {
    ctx.arc(200, 245, 30, 0, Math.PI);
  } else if (traits.mouthExpression === "neutral") {
    ctx.moveTo(185, 250);
    ctx.lineTo(215, 250);
  } else if (traits.mouthExpression === "smirk") {
    ctx.arc(200, 245, 30, 0, Math.PI / 2);
  } else {
    ctx.ellipse(200, 250, 15, 20, 0, 0, Math.PI * 2);
  }
  ctx.stroke();

  // Whiskers
  ctx.strokeStyle = "rgb(255,255,255)";
  ctx.lineWidth = traits.whiskerThickness;
  ctx.beginPath();
  ctx.moveTo(185, 235);
  ctx.lineTo(185 - traits.whiskerLength, 225);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(185, 245);
  ctx.lineTo(185 - traits.whiskerLength, 245);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(185, 255);
  ctx.lineTo(185 - traits.whiskerLength, 265);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(215, 235);
  ctx.lineTo(215 + traits.whiskerLength, 225);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(215, 245);
  ctx.lineTo(215 + traits.whiskerLength, 245);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(215, 255);
  ctx.lineTo(215 + traits.whiskerLength, 265);
  ctx.stroke();
}
