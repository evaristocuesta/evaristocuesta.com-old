import {Circle} from './circle.js'
import { Rectangle } from './rectangle.js';

export class Animation {

    #interval;
    #canvas;
    #context;
    #circle1;
    #circle2;

    constructor(canvas, context) {
        this.#canvas = canvas;
        this.#context = context;
        this.init();
    }

    init() {
        this.#resizeCanvas(this.#canvas, this.#context);
        var radius = this.#calculateRadius();
        this.#circle1 = new Circle("circle1", 0, -radius, radius, 2, 2, 
            new Rectangle(0, 0, this.#canvas.width, this.#canvas.height));
        this.#circle2 = new Circle("circle2", this.#canvas.width, this.#canvas.height + radius, radius, -2, -2,
            new Rectangle(0, 0, this.#canvas.width, this.#canvas.height));
        requestAnimationFrame(this.#update.bind(this));
    }

    resize() {
        this.#resizeCanvas(this.#canvas, this.#context);
        if (!this.#circle1.isInsideBounds()
            || !this.#circle2.isInsideBounds())
            this.init();
    }
    
    #resizeCanvas(canvas, context) {
        this.#canvas.width = window.innerWidth * devicePixelRatio;
        this.#canvas.height = window.innerHeight * devicePixelRatio;
    };
    
    #calculateRadius() {
        return Math.min(this.#canvas.width, this.#canvas.height) 
            + (Math.abs(this.#canvas.width - this.#canvas.height) / 2);
    }
    
    #drawCircle(circle) {
        this.#context.beginPath();
        this.#context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        this.#context.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.#context.fill();
        this.#context.closePath();
    }
    
    #update()
    {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#circle1.move();
        this.#circle2.move();
        this.#drawCircle(this.#circle1);
        this.#drawCircle(this.#circle2);
        requestAnimationFrame(this.#update.bind(this))
    }
}