import Circle from './circle.js'
import Rectangle from './rectangle.js';

export default class Animation {

    #canvas;
    #ctx;
    #circle1;
    #circle2;
    #lastTime = 0;
    #deltaTime = 0;
    #fpsMeter = 0;

    constructor(canvas, ctx, fpsMeter) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#init();
        this.#fpsMeter = fpsMeter;
    }

    #init() {
        this.#resizeCanvas(this.#canvas, this.#ctx);
        let radius = this.#calculateRadius();
        this.#circle1 = new Circle("circle1", 0, -radius, radius, 20, 20, 
            new Rectangle(0, 0, this.#canvas.width, this.#canvas.height));
        this.#circle2 = new Circle("circle2", this.#canvas.width, this.#canvas.height + radius, radius, -20, -20,
            new Rectangle(0, 0, this.#canvas.width, this.#canvas.height));
        requestAnimationFrame(this.#loop.bind(this));
    }

    resize() {
        this.#resizeCanvas(this.#canvas, this.#ctx);
        if (!this.#circle1.isInsideBounds()
            || !this.#circle2.isInsideBounds())
            this.init();
    }
    
    #resizeCanvas(canvas) {
        this.#canvas.width = window.innerWidth * devicePixelRatio;
        this.#canvas.height = window.innerHeight * devicePixelRatio;
    };
    
    #calculateRadius() {
        return Math.min(this.#canvas.width, this.#canvas.height) 
            + (Math.abs(this.#canvas.width - this.#canvas.height) / 2);
    }
    
    #update(deltaTime)
    {
        this.#fpsMeter.update(deltaTime);

        this.#circle1.update(deltaTime);
        this.#circle2.update(deltaTime);
    }

    #draw() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#circle1.draw(this.#ctx);
        this.#circle2.draw(this.#ctx);

        this.#fpsMeter.draw(this.#ctx);
    }

    #loop(timeStamp) {
        this.#deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        this.#update(this.#deltaTime);

        this.#draw();

        requestAnimationFrame(this.#loop.bind(this))
    }
}