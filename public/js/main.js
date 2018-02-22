import {Vector} from './vector.js';

//init screen
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//listen for resize events and draw the canvas
function initialize() {
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  //test vectors
  var test = new Vector(100,100);
  console.log(test);
  console.log(test.div(2));
  console.log(test.mul(2));
  console.log(test.mag());
  console.log(test.unit());
  console.log(test.add(new Vector(2,1)));
  console.log(test.sub(new Vector(2,1)));
  console.log(test.dot(new Vector(200,200)));
}

function redraw() {
  context.strokeStyle = 'blue';
  context.lineWidth = '5';
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  redraw();
}

window.onload = initialize;

//steps for program
//initialize boids
function Boid(canvas, x, y) {
  this.position = new Vector(x,y);
}

//draw boids on screen

//move all boids to new position
//pseudocode
/*
  vector v1, v2, v3
  boid b

  for each boid b
    v1 = rule1(b)
    v2 = rule2(b)
    v3 = rule3(b)

    b.velocity = b.velocity + v1 + v2 + v3
    b.position = b.position + b.velocity
*/

//rules

//Rule 1: Boids try to fly towards the centre of the mass of Boids
/*
  centre of mass is the average position of all the boids
*/

//Rule 2: Boids try to keep a small distance away from other objects

//Rule 3: Boids try to match the velocity of nearby boids

//Possible tweaks

//Goal setting
//Moving through a current
//Tendancy towards a place
//Speed Limits
//Antiflock behavior => scatter from predator