var doc;
var canvas;
var ctx;
var WIDTH = 800, HEIGHT = 800;
var color;
var ellipse;
var offset;
var ellipsesCreated;

class Ellipse {
  constructor(lineWidth, color, x, y, radius1, radius2, rotation, startAngle, endAngle) {
    this.lineWidth = lineWidth;
    this.color = color;
    this.x = x;
    this.y = y;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.rotation = rotation;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  move() {
    offset += genRan(10, 100)/25;
    this.rotation = offset * Math.PI / 180;
  }

  draw() {
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius1, this.radius2, this.rotation, this.startAngle, this.endAngle);
    ctx.stroke();

  }
}

function main() {
  doc = document;
  canvas = doc.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  doc.body.appendChild(canvas);

  init();

  setInterval(draw, 1000/10);
}

function init() {
  drawBackground();

  color = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0
  };
  offset = 0;
  ellipse = [];
  ellipsesCreated = false;

}

function genRan(val1, val2) {
  if ( val2 > val1 ) {
    var ranNum = Math.floor(Math.random()*((val2 - val1) + 1))+val1;
    return ranNum;
  } else {
    var error = "The first argument need to be greater than the second.";
    console.log(error);
  }
}

function createEllipses() {
  var ellipsesNum = genRan(1, 10);
  console.log(ellipsesNum);

  for ( let i = 0; i < ellipsesNum; i++ ) {
    color.red = genRan(0, 255);
    color.green = genRan(0, 255);
    color.blue = genRan(0, 255);
    color.alpha = genRan(10, 50)/100;

    var lineWidth = 3;
    var posX = WIDTH/2;
    var posY = HEIGHT/2;
    var rotation = 1 * Math.PI / 180;

    var radius1 = genRan(0, WIDTH / 2);
    var radius2 = genRan(radius1, (WIDTH / 2)+1);

    var ranColor = 'rgb('+color.red+', '+color.green+', '+color.blue+', '+color.alpha+')';
    console.log(color.alpha);

    ellipse[i] = new Ellipse(lineWidth, ranColor, posX, posY, radius1, radius2, rotation, 0, Math.PI * 2);
  }

  ellipsesCreated = true;
}

function drawBackground() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  //console.log(ellipsesCreated);

  if ( offset < 180 ) {

    if ( ellipsesCreated == false ) {

      ellipse = [];
      createEllipses();

    } else {

      for ( let e of ellipse ) {
        e.move();
        e.draw();
        //console.log(ellipse[0]);
      }

    }

  } else {
    ellipsesCreated = false;

    offset = 0;
    drawBackground();
  }

}

main();
