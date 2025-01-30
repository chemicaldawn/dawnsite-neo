var fire_img;
const fire_frequency = 300
var fire_ticker = 0
var fire_counter = 0

var x = 0;
var y = 0;

var lastUpdate = Date.now()

function startAnimating() {
    fire_img = document.getElementById("fire");

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
