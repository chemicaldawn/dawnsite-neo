
let fire_image;
let fire_button;
let fire_burning = true;

let fire_timer = 0
let fire_counter = 1

export function initFire(image, button) {
    fire_image = image
    fire_button = button
}

export function tickFire(deltaTime) {
    fire_timer += deltaTime
    console.log(fire_timer, deltaTime)


    if (fire_timer >= FireProperties.fire_interval) {
        fire_counter += 1
        fire_image.src = `/static/images/fire/fire${fire_counter.toString()}.png`
    }   

    fire_timer = fire_timer % FireProperties.fire_interval
    fire_counter = fire_counter % FireProperties.fire_frames
}

class FireProperties {
    static fire_frames = 7
    static fire_interval = 300
}