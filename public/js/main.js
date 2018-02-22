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

const sim = new Simulation();

sim.initialize();

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