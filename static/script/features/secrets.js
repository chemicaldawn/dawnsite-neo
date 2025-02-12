import { Object, BoomerangObject, summonObject, MoonObject} from "./objects.js"

/** @type {HTMLImageElement} */
let moon
let moonCounter = 0
let nudge = 0


export function initSecrets() {
    moon = document.getElementById("moon")

    moon.addEventListener("mousedown", () => {
        
        moonCounter += 1
        nudge = -Math.PI*2

        if (moonCounter == 5) {

            let width = document.body.clientWidth
            let height = document.body.clientHeight

            moon.style.opacity = "0"
            let newMoon = document.createElement("img")
            newMoon.src = "/static/images/moon.png"
            newMoon.draggable = false
            newMoon.classList.add("moon")

            let xOff = width / 2 - (0.13)*width
            let yOff = height - (0.04)*width
            let moonObj = new MoonObject(xOff, yOff, newMoon, 0.5)
            summonObject(moonObj)
        }
    })
}

export function tickSecrets() {
    if (nudge < 0) {
        nudge += 0.3
        
    } else if (nudge > 0) {
        nudge = 0
    } 

    moon.style.transform = `translateX(${Math.sin(nudge) * 2}px)`
}