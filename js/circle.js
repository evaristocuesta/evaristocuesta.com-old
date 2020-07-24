import {Rectangle} from './rectangle.js';

export class Circle {
    
    constructor(name, x, y, radius, speedX, speedY, bounds) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.bounds = bounds;
    }

    move() {
        this.checkDirection();
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkDirection() {
        if (this.x < this.bounds.x1 - this.radius
            || this.x > this.bounds.x2 + this.radius)
            {
                this.speedX = -this.speedX;
            }
        if (this.y < this.bounds.y1 - this.radius
            || this.y > this.bounds.y2 + this.radius)
            {
                this.speedY = -this.speedY;
            }
    }
}