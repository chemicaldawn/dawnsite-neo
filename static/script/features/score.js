/** @type {HTMLParagraphElement} */
let score_layer
/** @type {HTMLParagraphElement} */
let score_title
/** @type {HTMLParagraphElement} */
let score_counter
let scoreFade = 0

export function initScore() {
    score_layer = document.getElementById("score-layer")
    score_title = document.getElementById("score-title")
    score_counter = document.getElementById("score-counter")
}

export function tickScore(deltaTime) {
    scoreFade -= deltaTime

    if (scoreFade >= 0) {
        score_layer.style.opacity = `${Math.min(1.0, scoreFade / 1000)}`
    }
}

export function updateScore(name, score) {
    score_title.innerHTML = name
    score_counter.innerHTML = `score: ${score}`
    scoreFade = 5000
}