let stars = []
let numStars = 50
let nudge = 0

/** @type {HTMLDivElement} */
let area;

class Star {
    constructor() {
        this.element = document.createElement("div")
        this.element.classList.add("star")

        let startPos = this.randomStartingPosition()
        this.element.style.transform = `translate(${startPos[0]}px,${startPos[1]}px)`
        this.element.style.opacity = `${startPos[2]}`

        area.appendChild(this.element)
    }

    randomStartingPosition() {
        let x = area.scrollWidth;
        let y = area.scrollHeight;

        return [Math.random() * x, Math.random() * y, Math.random()]
    }
}

export function initStars() {
    area = document.getElementById("treeline-layer")

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star())
    }
}

export function tickStars() {
    
}