import FpsMeter from './fpsMeter.js';

export default class FpsMeterDefault extends FpsMeter {
    #REFRESH_TIME = 200;
    #fps = 0;
    #fpsArray = [];
    #totalTime = 0;

    update(deltaTime) {
        this.#totalTime += deltaTime;
        this.#fpsArray.push(1000 / deltaTime);
        if (this.#totalTime > this.#REFRESH_TIME) {
            this.#fps = (this.#fpsArray.reduce(
                (previous, current) => current + previous, 0)) / this.#fpsArray.length;
            this.#fpsArray = [];
            this.#totalTime = 0;
        }
    }

    draw(ctx) {
        ctx.font = "2.5em Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.#fps.toFixed(1) + " fps", 20, 40);
    }

}