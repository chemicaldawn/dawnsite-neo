import { Object, summonObject } from "./objects.js"

let diceRange = 400;
let diceHeight = 200;

let randomChoices

class DiceObject extends Object {

    constructor(x, y, element, bounciness) {
        super(x, y, element, bounciness)

        this.tossed = false
    }

    onDrop() {
        super.onDrop()

        if (this.velocity.length() > 0.1) {

            if (Math.abs(this.rotVelocity) <= 0.3) {
                this.rotVelocity = 1.5
            } else {
                this.rotVelocity *= 8
            }

            this.tossed = true
        }
    }

    land() {
        super.land()
        
        if (this.tossed) {
            randomize()
            this.tossed = false
        }
    }
}

export function initRandom() {
    tryBind()

    document.getElementById("page").addEventListener("htmx:afterSwap", () => {
        tryBind()
    })
}

export function tickRandom() {

}

function tryBind() {
    let random = document.querySelector("#random-label")

    if (random != null) {
        random.addEventListener("mousedown", () => {
            let diceElement = document.createElement("img")
            diceElement.src = "/static/images/dice.png"
            diceElement.style.width = "1.75vw"
            diceElement.style.height = "1.75vw"
            diceElement.draggable = false
            let dice = new DiceObject(diceRange * (Math.random() - 0.5),  diceHeight, diceElement, 0.5)
            summonObject(dice)
        })
    }
}

function randomize() {
    fetch("/roll-the-dice").then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        window.location.href = data.url
    })
}