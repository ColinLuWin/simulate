export default class boundingCircle {
    constructor(anchor, r) {
        this.anchor = anchor;
        this.radius = r;
    }

    draw() {
        fill(0, 255, 0, 75);
        circle(this.anchor.pos.x, this.anchor.pos.y, this.radius);
    }

    toCircle() {
        return new SAT.Circle(new SAT.Vector(this.anchor.pos.x, this.anchor.pos.y), this.radius);
    }

    trigger() {
        this.anchor.findWayOut();
    }
}