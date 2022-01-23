let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let w = canvas.width;
let h = canvas.height;

let dotSize = 1;

let cx = w / 2;
let cy = h / 2;

let sRadius = 200;
let mRadius = 200;
let hRadius = 150;

let sAngle = 0;
let mAngle = 0;
let hAngle = 0;

let fps = 60;

ctx.fillStyle = "#ffffff";
ctx.strokeStyle = "#ffffff";

function draw(sx, sy, mx, my, hx, hy) {
  ctx.clearRect(0, 0, w, h);
  ctx.save();

  //
  //DRAW DOTS
  //draw seconds dot
  ctx.beginPath();
  ctx.rect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  //draw minutes dot
  ctx.beginPath();
  ctx.rect(mx - dotSize / 2, my - dotSize / 2, dotSize, dotSize);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  //draw hourss dot
  ctx.beginPath();
  ctx.rect(hx - dotSize / 2, hy - dotSize / 2, dotSize, dotSize);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  //draw center dot
  ctx.beginPath();
  ctx.rect(cx - dotSize / 2, cy - dotSize / 2, dotSize, dotSize);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  //
  //CONNECT FULL LINES
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

  //
  //CONNECT DOTTES LINES
  //set dottes line
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

  //set full line
  ctx.setLineDash([]);

  //
  //FILL TRIANGLE
  //draw triangle
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(hx, hy);
  ctx.lineTo(mx, my);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
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

    sAngle =
      2 *
        Math.PI *
        ((new Date().getSeconds() * 1000 + new Date().getMilliseconds()) /
          1000 /
          60) -
      0.5 * Math.PI;
    let newXS = cx + sRadius * Math.cos(sAngle);
    let newYS = cy + sRadius * Math.sin(sAngle);

    mAngle = 2 * Math.PI * (new Date().getMinutes() / 60) - 0.5 * Math.PI;
    let newXM = cx + mRadius * Math.cos(mAngle);
    let newYM = cy + mRadius * Math.sin(mAngle);

    hAngle = 2 * Math.PI * (new Date().getHours() / 24) - 0.5 * Math.PI;
    let newXH = cx + hRadius * Math.cos(hAngle);
    let newYH = cy + hRadius * Math.sin(hAngle);

    draw(newXS, newYS, newXM, newYM, newXH, newYH);

    // draw the centerpoint
    ctx.beginPath();
    ctx.arc(cx, cy, sRadius + 25, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }, 1000 / fps);
}
animate();
