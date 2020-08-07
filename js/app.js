import Animation from './animation.js';
import FpsMeter from './fpsMeter.js';
import FpsMeterDefault from './fpsMeterDefault.js';

window.onresize = resize;
window.onload = initialize;

let anim;

function resize() {
    anim.resize();
}

function initialize () {
    email();
    flip();
    animation();
}

function email () {
    const email = 'contact' + '@' + 'evaristocuesta' + '.' + 'com';
    const emailElement = document.getElementById('email');
    emailElement.children[1].innerHTML = email;
    emailElement.setAttribute('href', 'mailto:' + email);
}

function flip () {
    const card = document.querySelector('.card');
    const buttons = document.querySelectorAll('.card .btn');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            card.classList.toggle('is-flipped');
        });
    });
}

function animation() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    let fpsMeter;
    if (new URLSearchParams(document.location.search).get('showfps')) {
        fpsMeter = new FpsMeterDefault();
    }
    else {
        fpsMeter = new FpsMeter();
    }

    anim = new Animation(canvas, context, fpsMeter);
}