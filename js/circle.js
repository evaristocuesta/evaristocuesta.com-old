import Rectangle from './rectangle.js';

export default class Circle {
    
    constructor(name, x, y, radius, speedX, speedY, bounds) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.bounds = bounds;
    }

    update(deltaTime) {
        this.#checkDirection();
        this.x += (this.speedX / deltaTime);
        this.y += (this.speedY / deltaTime);
    }

    isInsideBounds() {
        return (this.x >= this.bounds.x1 - this.radius
            && this.x <= this.bounds.x2 + this.radius
            && this.y >= this.bounds.y1 - this.radius
            && this.y <= this.bounds.y2 + this.radius);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        ctx.closePath();
    }

    #checkDirection() {
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