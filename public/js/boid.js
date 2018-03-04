import {Vector} from './vector.js';

//initialize boids
export function Boid(simulation, x, y) {
  this.position = new Vector(x,y);
  //generate a random angle/direction for the boid to travel
  const angle = 2 * Math.PI * Math.random();
  this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
  this.acceleration = new Vector(0,0);

  //boids only react to things they can 'see' not sure what the ideal distance is - test out later
  this.sightDistance = 150;
  //how far boids want to be apart
  this.separationDistance = 40;
  this.maxVel = 3;
  this.max_turn = .001;
  this.simulation = simulation;
}

Boid.prototype = {
  //rules
  //Rule 1: Boids try to fly towards the centre of the mass of Boids
  //take the whole boids array as the centre of mass only makes sense when applied to the flock
  group: function(boids) {
    let groupPosition = new Vector(0,0);
    let neighbourCount = 0;
    
    //find the boids that this boid can 'see' and add up the group position
    for(let x in boids) {
      let distance = this.position.distance(boids[x].position);
      if(distance <= this.sightDistance) {
        groupPosition = groupPosition.add(boids[x].position);
        neighbourCount ++;
      }
    }

    //find the centre of mass of the local boids
    if(neighbourCount > 0) {
      let centreMass = groupPosition.div(neighbourCount);
      //boid wants to be at centremass
      let desire = centreMass.sub(this.position);
      //scale it so it doesn't teleport
      desire = desire.setMag(this.maxVel);
      desire = desire.sub(this.velocity);
      //limit turning speed
      desire = desire.limit(this.max_turn);

      //subtract its current velocity to allow it to turn
      return desire;
    } else {
      //if it is by it self just keep on going
      return new Vector(0,0);
    }

  },
  //Rule 2: Boids try to keep a small distance away from other objects
  separation: function(boids) {
    let neighbourCount = 0;
    let directionVector = new Vector(0, 0);

    //check to see if the boids are 'too close'
    for (let x in boids) {
      let distance = this.position.distance(boids[x].position);
      if (distance > 0 && distance < this.separationDistance) {
        let deltaV = this.position.sub(boids[x].position);
        deltaV = deltaV.unit();
        deltaV = deltaV.div(distance);
        directionVector = directionVector.add(deltaV);
        neighbourCount++;
      }
    }

    if (neighbourCount > 0) {
      let average = directionVector.div(neighbourCount);

      if (average.mag() > 0 ) {
        average = average.setMag(this.maxVel);
        average = average.sub(this.velocity);
        average = average.limit(this.max_turn);
      }
      return average;
    } else {
      return new Vector(0,0);
    }

  },
  //Rule 3: Boids try to match the velocity of nearby boids
  alignment: function(boids) {
    let flockVel = new Vector(0,0);
    let neighbourCount = 0;

    for (let x in boids) {
      let distance = this.position.distance(boids[x].position);
      if(distance > 0 && distance < this.sightDistance) {
        flockVel = flockVel.add(boids[x].velocity);
        neighbourCount++;
      }
    }

    if (neighbourCount > 0) {
      let average = flockVel.div(neighbourCount);
      average = average.setMag(this.maxVel);
      average = average.sub(this.velocity);
      average = average.limit(this.max_turn);
      return average;
    } else {
      return new Vector(0,0);
    }
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
  flock: function(boids) {
    //this.acceleration  = this.acceleration + rules
    let rule1 = this.group(boids);
    let rule2 = this.separation(boids);
    rule2 = rule2.mul(2);
    let rule3 = this.alignment(boids);

    this.acceleration = this.acceleration.add(rule1);
    this.acceleration = this.acceleration.add(rule2);
    this.acceleration = this.acceleration.add(rule3);
  },
  
  run: function(boids) {
    this.flock(boids); //flock calculations
    this.update(); //position boids
    this.render(); //draw
  },

  update: function() {
    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = this.velocity.limit(this.maxVel);
    this.position = this.position.add(this.velocity);
    this.border();
    this.acceleration = this.acceleration.mul(0);
  }
}

//Possible tweaks

//Goal setting
//Moving through a current
//Tendancy towards a place
//Speed Limits
//Antiflock behavior => scatter from predator