let stars = []
let numStars = 50
let nudge = 0

let starX = 100
let starY = 40
let starTick = 0

/** @type {HTMLDivElement} */
let area;

class Star {
    constructor() {
        this.element = document.createElement("div")
        this.element.classList.add("star")

        let startPos = this.randomStartingPosition()
        this.relY = (starY - startPos[1])/starY

        this.element.style.transform = `translate(${startPos[0]}vw,${startPos[1]}vh)`
        this.starPhaseShift = Math.random() * 2 * Math.PI
        this.phaseMultiplier = Math.random() * 0.5 + 1

        area.appendChild(this.element)
        this.update()
    }

    update() {
        this.element.style.opacity = `${(0.5 * Math.sin(this.phaseMultiplier * (this.starPhaseShift + starTick)) + 0.5) * this.relY}`
    }

    randomStartingPosition() {
        let x = area.scrollWidth;
        let y = area.scrollHeight;

        return [Math.random() * starX, Math.random() * starY, Math.random()]
    }
}

export function initStars() {
    area = document.getElementById("treeline-layer")

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star())
    }
}

export function tickStars(deltaTime) {
    for (let i = 0; i < stars.length; i++) {
        starTick += deltaTime / 30000
        stars[i].update()
    }
}