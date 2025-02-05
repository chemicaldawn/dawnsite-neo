export function clamp(val, low, high) {
    return Math.min(Math.max(val, low), high)
}

export class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    difference(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    distanceFrom(x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))
    }
}
