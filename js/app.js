import {Animation} from './animation.js';

var card = document.querySelector('.card');
var buttons = document.querySelectorAll('.card .btn');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        card.classList.toggle('is-flipped');
    });
});

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

let anim = new Animation(canvas, context);
window.onresize = resize;

function resize() {
    anim.resize();
}