import {Boid} from './boid.js';

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
      let boid = new Boid(this, this.canvas.width/2, this.canvas.height/2);
      this.boids.push(boid);
    }
  },
  move: function() {
    for(let x in this.boids) {
      //pass in info from whole array of boids to calculate flock behaviors
      this.boids[x].flock(this.boids);
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
      this.boids[x].run(this.boids);
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
    }, 15);
  }
}

const sim = new Simulation();
sim.initialize();
sim.run();