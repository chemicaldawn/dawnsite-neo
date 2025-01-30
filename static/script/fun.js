var fire_img;
const fire_frequency = 300
var fire_ticker = 0
var fire_counter = 0

/** @type {HTMLDivElement} */
var firefly_layer;
const firefly_count = 8;
const firefly_spread = 200;
const firefly_speed = 0.03;
const firefly_boost = 100;
const fire_light_radius = 125;
const run_speed = 0.3;
const run_dist = 50;
let fireflies = []
let firefly_positions = []

let mouseX = 0;
let mouseY = 0;

var lastUpdate = Date.now()

function startAnimating() {
    fire_img = document.getElementById("fire")
    firefly_layer = document.getElementById("firefly-layer")

    spawn_fireflies()

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    ladybug(Math.round(Math.random() * 1000))
    window.requestAnimationFrame(animLoop);
}

function animLoop() {
    animate();
    window.requestAnimationFrame(animLoop);
}

function animate() {
    var now = Date.now()
    var deltaTime = now - lastUpdate
    lastUpdate = now

    fire(deltaTime)
    move_fireflies(deltaTime)
}

function ladybug(random) {
    console.log("your ladybug is: " + random.toString())

    // creepy man
    if (random > 500) {
        
    }
}

function fire(deltaTime) {
    fire_ticker += deltaTime;
    if (fire_ticker >= fire_frequency) {
        const fire_value = fire_counter + 1

        fire_img.src = "/static/images/fire/fire" + fire_value.toString() + ".png";

        fire_counter += 1
        if (fire_counter == 7) {
            fire_counter = 0
        }

        fire_ticker = fire_ticker % fire_frequency
    }
}

function random_walk(deltaTime) {
    return (Math.random() - 0.5) * deltaTime * firefly_speed;
}

function randomPosition() {
    return 2*(Math.random() - 0.5) * firefly_spread
}

function positionToTransform(position) {
    return "translate(" + Math.round(position[0]).toString() + "px, " + Math.round(position[1]).toString() + "px)"
}

function move_fireflies(deltaTime) {
    for (let i = 0; i < firefly_count; i++) {
        const firefly = fireflies[i]
        const ref = firefly_positions[i]
        ref[0] += random_walk(deltaTime)
        ref[1] += random_walk(deltaTime)

        if (ref[1] > 0) {
            ref[1] = -Math.abs(ref[1])
        }

        // calculate fire color
        const dist = Math.sqrt(Math.pow(ref[0],2) + Math.pow(ref[1] + 100,2));
        let color = (2 * fire_light_radius - dist) / fire_light_radius
        
        if (color > 1) {
            color = 1
        }
        if (color < 0) {
            color = 0
        }

        firefly.style.backgroundColor = "rgba(255,255,255," + color.toString() + ")"

        // calculate mouse distance
        const relMouseX = (mouseX - document.body.scrollWidth / 2)
        const relMouseY = (mouseY - document.body.scrollHeight)
        const relVec = [relMouseX - ref[0], relMouseY - ref[1]]
        const mouse_dist = Math.sqrt(Math.pow(relVec[0], 2) + Math.pow(relVec[1], 2));

        const xspeed = relVec[0] / Math.pow(mouse_dist, 2)
        const yspeed = relVec[1] / Math.pow(mouse_dist, 2)

        if (mouse_dist <= run_dist) {
            ref[0] -= run_speed * xspeed * deltaTime
            ref[1] -= run_speed * yspeed * deltaTime
        }

        const new_pos = positionToTransform(ref);
        firefly.style.transform = new_pos
    }
}

function spawn_fireflies(deltaTime) {
    for(let i = 0; i < firefly_count; i++) {
        let firefly = document.createElement("div")

        firefly.addEventListener("click", () => {
            firefly_alert()
        })

        firefly.classList.add("firefly")
        let pos = [randomPosition(), -Math.abs(randomPosition()) - firefly_boost]
        firefly_positions.push(pos)
        firefly.style.transform = positionToTransform(pos)

        firefly_layer.appendChild(firefly)
        fireflies.push(firefly)
    }
}

function firefly_alert() {
    console.log("Bruh")
}