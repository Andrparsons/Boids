# Boids

This is a JavaScript implementation of Boids, an artificial life program developed by Craig Reynolds in 1986.

This implementation is based on the this [writeup](http://www.red3d.com/cwr/boids/) and [pseudocode](http://www.kfish.org/boids/pseudocode.html).

The simluation uses 3 rules to create emergent behavior.

1. Cohesion: steer to centre of mass of the flockmates they can see
2. Separation: steer to avoid crowding
3. Alignment: steer to the average heading of visable flockmates

This is a work in progress and I will be adding additional features over time

1. Goal setting
2. Moving against a current
3. Antiflock behavior (scatter to avoid predators)