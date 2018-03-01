import {Vector} from './vector.js';

//simulation 
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

    //initialize array to hold the boids
    this.boids = [];
    for (let i = 0; i < 100; i++) {
      //initial position of boids
      let boid = new Boid(this, this.canvas.width * Math.random(), this.canvas.height * Math.random());
      this.boids.push(boid);
    }
  },
  move: function() {
    for(let x in this.boids) {
      this.boids[x].flock();
    }
  },
  resizeCanvas: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.render();
  },
  render: function() {
    //clear screen between frames or it looks like a pen stroke rather than movement
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw all the boids in the array
    for (let x in this.boids) {
      this.boids[x].run();
    }
  },
  run: function() {
    const intRef = this;
    //set the timing for each frame (aka fps)
    setInterval(function() {
      //run movement code
      intRef.move();
      //draw boids
      intRef.render();
    }, 30);
  }
}

//steps for program
//initialize boids
function Boid(simulation, x, y) {
  this.position = new Vector(x,y);
  //generate a random angle/direction for the boid to travel
  const angle = 2 * Math.PI * Math.random();
  this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
  this.acceleration = new Vector(0,0);
  //boids only react to things they can 'see' not sure what the ideal distance is - test out later
  this.sightDistance = 100;
  this.simulation = simulation;
}

Boid.prototype = {
  //rules
  //Rule 1: Boids try to fly towards the centre of the mass of Boids
  group: function() {
    


  },
  //Rule 2: Boids try to keep a small distance away from other objects
  separation: function() {

  },
  //Rule 3: Boids try to match the velocity of nearby boids
  alignment: function() {

  },
  //keep boids within border
  border: function() {
    if (this.position.x > window.innerWidth) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = window.innerWidth;
    }
    if (this.position.y > window.innerHeight) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = window.innerHeight;
    }
  },
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
  },
  //flock interactions
  flock: function() {
    //this.acceleration  = this.acceleration + rules
    let testVector = new Vector(100,100);
    //this.acceleration = this.acceleration.add(testVector);
  },
  
  run: function() {
    //this.flock(); //flock calculations
    this.update(); //position boids
    this.render(); //draw
  },

  update: function() {
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

    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
    this.border();
    this.acceleration = this.acceleration.mul(0);
  }
}

const sim = new Simulation();
sim.initialize();
sim.run();

//Possible tweaks

//Goal setting
//Moving through a current
//Tendancy towards a place
//Speed Limits
//Antiflock behavior => scatter from predator