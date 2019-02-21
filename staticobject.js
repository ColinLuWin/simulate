export default class StaticObject {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    draw() {
        fill(80);
        rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
}