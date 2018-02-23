import {Vector} from './vector.js';

function Simulation() {
  //init screen
  this.canvas = document.getElementById('screen');
  this.context = this.canvas.getContext('2d');
}

Simulation.prototype = {
  initialize: function() {
    //add listener to make sure the canvas uses the whole available area on screen
    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    this.resizeCanvas();

    //draw boids on screen
    //one to start, right in the middle => pass the simulation reference to the boid fuction so it can asscess the canvas to draw
    const boid = new Boid(this, this.canvas.width /2, this.canvas.height /2);
    boid.render();
  },
  resizeCanvas: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.render();
  },
  render: function() {
    this.context.strokeStyle = 'blue';
    this.context.lineWidth = '5';
    this.context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

//steps for program
//initialize boids
function Boid(simulation, x, y) {
  this.position = new Vector(x,y);
  //generate a random angle/direction for the boid to travel
  const angle = 2 * Math.PI * Math.random();
  this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
  this.simulation = simulation;
}

Boid.prototype = {
  //draw boids on screen
  render: function() {
    let directionVector = this.velocity.unit().mul(20);
    let inverse1 = new Vector(-directionVector.y, directionVector.x);
    let inverse2 = new Vector(directionVector.y, -directionVector.x);
    inverse1 = inverse1.div(3);
    inverse2 = inverse2.div(3);

    this.simulation.context.beginPath();
    this.simulation.context.moveTo(this.position.x, this.position.y);
    this.simulation.context.lineTo(this.position.x + inverse1.x, this.position.y + inverse1.y);
    this.simulation.context.lineTo(this.position.x + directionVector.x, this.position.y + directionVector.y);
    this.simulation.context.lineTo(this.position.x + inverse2.x, this.position.y + inverse2.y);
    this.simulation.context.lineTo(this.position.x, this.position.y);
    this.simulation.context.fillStyle = 'red';
    this.simulation.context.fill();
  }
}

const sim = new Simulation();
sim.initialize();

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