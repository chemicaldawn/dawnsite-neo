import { Vector2, clamp } from "../utils.js";
import { updateScore } from "./score.js";

let object_layer;

let objects = [];
let g = 0.001;
let ground = 130;
let damping = 0.003

let recentDeltaTime;

export class Object {

    constructor(x, y, element, bounciness) {

        this.element = element
        object_layer.appendChild(this.element)
        this.element.classList.add("object")
        this.dragging = false

        this.position = new Vector2(x, y)
        this.rotPosition = 0
        this.velocity = new Vector2(0, 0)
        this.rotVelocity = 0

        this.turn = 1
        this.bounciness = bounciness
        
        this.element.addEventListener("mousedown", () => {
            this.onPickup()
        })

        document.body.addEventListener("mousemove", (event) => {
            if (this.dragging) {
                this.onDrag()
            }
        })

        document.body.addEventListener("mouseup", () => {
            if (this.dragging) {
                this.onDrop()
            }
            this.dragging = false
        })
    }

    onPickup() {
        this.dragging = true
        document.body.style.userSelect = "none"
    }

    onDrag() {
        this.position.x += event.movementX
        this.position.y -= event.movementY

        this.lastMovementX = event.movementX
        this.lastMovementY = -event.movementY
        this.dt = recentDeltaTime
    }

    onDrop() {
        this.velocity = new Vector2(this.lastMovementX * this.dt * damping, this.lastMovementY * this.dt * damping)
        this.rotVelocity = this.lastMovementX / 40

        document.body.style.userSelect = "inherit"
    }

    updateVisualPosition() {
        this.element.style.transform = `translate(${this.position.x}px,${-this.position.y}px) rotate(${this.rotPosition}deg)`
    }

    land() {
        this.position.y = ground
        this.velocity = new Vector2(0,0)
        this.rotPosition = 0
        this.rotVelocity = 0
    }

    tick(deltaTime) {
        if (!this.dragging) {
            this.velocity.y -= g * deltaTime;

            this.position.x += this.velocity.x * deltaTime * this.turn;
            this.position.y += this.velocity.y * deltaTime;
            this.rotPosition += this.rotVelocity * deltaTime;

        } else {

            this.velocity.x = 0
            this.velocity.y = 0
        }    

        if (this.position.y <= ground) {
            if (this.bounciness > 0) {
                this.velocity.y = this.bounciness * -this.velocity.y
                this.velocity.x *= this.bounciness
                this.position.y = ground + 0.01

                if (this.velocity.y <= 0.01) {
                    this.land()
                }

            } else {
                this.land()
            }
            
        }

        this.updateVisualPosition();
    }
}

export class BoomerangObject extends Object {

    constructor(x, y, element, bounciness) {
        super(x, y, element, bounciness)
    }

    tick(deltaTime) {

        if (!this.dragging && this.turn > -1.5) {
            this.turn -= 0.0014 * deltaTime
        }

        super.tick(deltaTime)
    }

    onDrop() {
        super.onDrop()

        this.rotVelocity *= 3
        this.turn = 1
    }
}

export class MoonObject extends BoomerangObject {

    constructor(x, y, element, bounciness) {
        super(x, y, element, bounciness)

        this.airborne = false
        this.score = 0
    }

    onDrop() {
        this.airborne = true
        super.onDrop()
    }

    onPickup() {

        if (this.turn <= -0.5 && Math.abs(this.velocity.x) > 0.1 && this.airborne) {
            this.score += 1
            updateScore("moonerang", this.score)
        }

        super.onPickup()
    }


    tick(deltaTime) {

        if (this.position.y <= (ground + 20)) {
            this.airborne = false

            if (this.score > 0) {
                updateScore("moonerang", 0)
            }
    
            this.score = 0
        }
        super.tick(deltaTime)

    }
}

export function initObjects() {
    object_layer = document.getElementById("object-layer")
}

export function tickObjects(deltaTime) {

    if (deltaTime > 100) {
        deltaTime = 100
    }

    objects.forEach((object) => {
        object.tick(deltaTime)
    })

    recentDeltaTime = deltaTime;
}

export function summonObject(obj) {
    objects.push(obj)
}