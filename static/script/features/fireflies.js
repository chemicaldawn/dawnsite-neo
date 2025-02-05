import { Vector2, clamp } from "../utils.js";

let fireflyLayer;
let fireflies = [];

export function initFireflies(layerObject) {

    fireflyLayer = layerObject

    for (let i = 0; i < FireflyProperties.firefly_count; i++) {
        fireflies.push(new Firefly())
    }
}

export function tickFireflies(mouseX, mouseY, deltaTime) {
    for (const firefly of fireflies) {
        firefly.tick(mouseX, mouseY, deltaTime)
    }
}

class FireflyProperties {

    static firefly_count = 8
    static firefly_spread = 200
    static firefly_boost = 100
    static fire_light_radius = 125

    static wander_speed = 0.5

    static sprint_speed = 0.5
    static sprint_dist = 75
}

class Firefly {
    constructor() {
        this.div = document.createElement("div")
        this.div.classList.add("firefly")
        this.position = new Vector2(this.randomStartingPosition(), -Math.abs(this.randomStartingPosition()) - FireflyProperties.firefly_boost)

        fireflyLayer.appendChild(this.div)
        this.updateVisualPosition()
    }

    tick(mouseX, mouseY, deltaTime) {
        this.wander()
        this.attemptSprint(mouseX, mouseY, deltaTime)
        this.updateVisualPosition()
        this.updateColor()
    }

    wander() {
        this.position.x += this.randomWanderingPosition();
        this.position.y += this.randomWanderingPosition();
    }

    attemptSprint(mouseX, mouseY, deltaTime) {
        const relativeMouse = new Vector2(
            mouseX - document.body.scrollWidth / 2 - this.position.x, 
            mouseY - document.body.scrollHeight - this.position.y)
        const dist = relativeMouse.length()

        if (dist <= FireflyProperties.sprint_dist) {
            this.position.x -= deltaTime * FireflyProperties.sprint_speed * (relativeMouse.x / Math.pow(dist, 2))
            this.position.y -= deltaTime * FireflyProperties.sprint_speed * (relativeMouse.y / Math.pow(dist, 2))
        }
    }

    updateVisualPosition() {
        this.div.style.transform = `translate(${this.position.x}px,${this.position.y}px)`
    }

    updateColor() {
        const dist = this.position.distanceFrom(0, -FireflyProperties.firefly_boost)
        const color = clamp((2 * FireflyProperties.fire_light_radius - dist) / FireflyProperties.fire_light_radius, 0, 1)
        this.div.style.backgroundColor = `rgba(255,255,255,${color.toString()})`
    }

    randomStartingPosition() {
        return 2*(Math.random() - 0.5) * FireflyProperties.firefly_spread
    }

    randomWanderingPosition() {
        return (Math.random() - 0.5) * FireflyProperties.wander_speed
    }
}