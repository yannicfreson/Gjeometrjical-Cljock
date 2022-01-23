let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let w = canvas.width;
let h = canvas.height;

let dotSize = 0;

let cx = w / 2;
let cy = h / 2;

let sRadius = w / 2 - w * 0.05;
let mRadius = sRadius;
let hRadius = w / 2 - w * 0.15;

let sAngle = 0;
let mAngle = 0;
let hAngle = 0;

let fps = 60;

function draw(sx, sy, mx, my, hx, hy) {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, w, h);
  ctx.save();

  function drawElement(arg1, arg2, arg3) {
    ctx.beginPath();
    ctx.rect(arg1, arg2, arg3, arg3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function connectFullLines() {
    //set full line
    ctx.setLineDash([]);
    //connect center and minutes
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(mx, my);
    ctx.stroke();

    //connect center and hours
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(hx, hy);
    ctx.stroke();

    //connect minutes and hours
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(hx, hy);
    ctx.stroke();
  }

  function connectDottedLines() {
    //set dotted line
    ctx.setLineDash([2, 2]);

    //connect seconds and center
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    //connect seconds and hours
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(hx, hy);
    ctx.stroke();

    //connect seconds and minutes
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(mx, my);
    ctx.stroke();
  }

  function fillTriangle() {
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(hx, hy);
    ctx.lineTo(mx, my);
    ctx.fill();
  }

  //seconds point
  drawElement(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
  //minutes point
  drawElement(mx - dotSize / 2, my - dotSize / 2, dotSize, dotSize);
  //hours point
  drawElement(hx - dotSize / 2, hy - dotSize / 2, dotSize, dotSize);
  //center point
  drawElement(cx - dotSize / 2, cy - dotSize / 2, dotSize, dotSize);
  //draw triangle between center, hours and mins
  connectFullLines();
  //draw dottes lines between center, hours, mins and seconds
  connectDottedLines();
  //fill triangle between center, hours and mins
  fillTriangle();
}

window.requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / fps);
    }
  );
})();

function animate() {
  setTimeout(function () {
    requestAnimFrame(animate);

    const milliseconds = new Date().getMilliseconds();
    const seconds = new Date().getSeconds();
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();

    sAngle =
      2 * Math.PI * ((seconds * 1000 + milliseconds) / 1000 / 60) -
      0.5 * Math.PI;
    let newXS = cx + sRadius * Math.cos(sAngle);
    let newYS = cy + sRadius * Math.sin(sAngle);

    mAngle = 2 * Math.PI * (minutes / 60) - 0.5 * Math.PI;
    let newXM = cx + mRadius * Math.cos(mAngle);
    let newYM = cy + mRadius * Math.sin(mAngle);

    hAngle = 2 * Math.PI * (hours / 12) - 0.5 * Math.PI;
    let newXH = cx + hRadius * Math.cos(hAngle);
    let newYH = cy + hRadius * Math.sin(hAngle);

    draw(newXS, newYS, newXM, newYM, newXH, newYH);

    // draw the centerpoint
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(cx, cy, w / 2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }, 1000 / fps);
}

animate();
