import { initFire, tickFire } from "./features/fire.js"
import { initFireflies, tickFireflies } from "./features/fireflies.js"

let mouseX = 0;
let mouseY = 0;

let lastFrame = Date.now();

export function init() {
    registerEventHandlers()

    initFire(document.getElementById("fire-image"), document.getElementById("fire-button"))
    initFireflies(document.getElementById("firefly-layer"))

    window.requestAnimationFrame(tick)
}

function tick() {
    let deltaTime = Date.now() - lastFrame;
    lastFrame = Date.now()

    tickFire(deltaTime)
    tickFireflies(mouseX, mouseY, deltaTime)

    window.requestAnimationFrame(tick);
}

function registerEventHandlers() {
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
}

document.addEventListener("DOMContentLoaded", function(arg) {
    init()
});