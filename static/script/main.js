import { initFire, tickFire } from "./features/fire.js"
import { initFireflies, tickFireflies } from "./features/fireflies.js"
import { initStars, tickStars } from "./features/stars.js"
import { initObjects, tickObjects } from "./features/objects.js"
import { initRandom, tickRandom } from "./features/random.js"
import { initScore, tickScore } from "./features/score.js"
import { initSecrets, tickSecrets } from "./features/secrets.js"

let mouseX = 0;
let mouseY = 0;

let lastFrame = performance.now()

export function init() {
    registerEventHandlers()

    initFire(document.getElementById("fire-image"), document.getElementById("fire-button"))
    initFireflies(document.getElementById("firefly-layer"))
    initStars()
    initObjects()
    initRandom()
    initScore()
    initSecrets()

    window.requestAnimationFrame(tick)
}

function tick() {
    let deltaTime = performance.now() - lastFrame;
    lastFrame = performance.now()

    tickFire(deltaTime)
    tickFireflies(mouseX, mouseY, deltaTime)
    tickStars()
    tickObjects(deltaTime)
    tickRandom()
    tickSecrets()
    tickScore()

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