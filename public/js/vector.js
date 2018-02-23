//Javascript does not have build in Vector object, so I made my own

export function Vector(x,y) {
  this.x = x
  this.y = y
}

Vector.prototype = {
  //vector math functions
  //magnitude
  mag: function() { return Math.sqrt(this.x * this.x + this.y * this.y) },
  //unit vector
  unit: function() {
    let mag = this.mag()
    return new Vector(this.x / mag, this.y / mag)
   },
  //scalars
  div: function(k) { return new Vector(this.x / k, this.y / k) },
  mul: function(k) { return new Vector(this.x * k, this.y * k) },
  //adding and subtracting vectors
  add: function(vec) { return new Vector(this.x + vec.x, this.y + vec.y)},
  sub: function(vec) { return new Vector(this.x - vec.y, this.y - vec.y)},
  // dot product
  dot: function(vec) { return (this.x * vec.x + this.y * vec.y)},
  //max magnitude allowed
  limit: function(max) {
    if (this.mag() > max) {
      let unit = this.unit();
      return new Vector(unit.x * max, unit.y * max);
    }
    return this;
  }
}