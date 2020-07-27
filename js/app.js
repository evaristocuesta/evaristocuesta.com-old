import Animation from './animation.js';
import FpsMeter from './fpsMeter.js';
import FpsMeterDefault from './fpsMeterDefault.js';

const card = document.querySelector('.card');
const buttons = document.querySelectorAll('.card .btn');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        card.classList.toggle('is-flipped');
    });
});

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let fpsMeter;
if (new URLSearchParams(document.location.search).get('showfps')) {
    fpsMeter = new FpsMeterDefault();
}
else {
    fpsMeter = new FpsMeter();
}

const anim = new Animation(canvas, context, fpsMeter);
window.onresize = resize;

function resize() {
    anim.resize();
}