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

}