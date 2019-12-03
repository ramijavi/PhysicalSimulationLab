var dot;

function setup() {
  createCanvas(900, 600);
  dot = new Dot();
}

function draw() {
  background(0);
  dot.run();
}

function Dot() {
  this.velocity = createVector(6, -6);
  this.loc = createVector(width/2, height/2);
  this.acceleration = createVector(0, 0.1);
  this.diam = 40;

  this.run = function() {
    this.draw();
    this.move();
  }

  this.draw = function() {
    fill(125);
    ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
  }

  this.move = function() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
  }
}

function keyPressed() {
  if (keyCode == 32) {
    print("yay");
    dot.velocity = createVector(6, -6);
    dot.loc = createVector(width/2, height/2);
    dot.acceleration = createVector(0, 0.1);
    dot.run();
  } 
}
