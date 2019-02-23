export default class visionLine {
    constructor(anchor, len, type) {
        this._anchor = anchor;
        this._length = len;
        this._type = type;
    }

    updateRelativePosition(x, y) {
        this.relative.x = x;
        this.relative.y = y;
    }

    _getRelativePosition() {
        var co = this._type === 'left' ? -1 : 1;

        var x0 = this._anchor.boundingCircle.radius * cos(this._anchor.angle + radians(90) * co);
        var y0 = this._anchor.boundingCircle.radius * sin(this._anchor.angle + radians(90) * co);

        var x1 = x0 + this._length * cos(this._anchor.angle);
        var y1 = y0 + this._length * sin(this._anchor.angle);

        return {
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1
        };
    }

    toPolygon() {
        var relativePos = this._getRelativePosition();

        var polygon = new SAT.Polygon(new SAT.Vector(this._anchor.pos.x, this._anchor.pos.y), [
            new SAT.Vector(relativePos.x0, relativePos.y0),
            new SAT.Vector(relativePos.x1, relativePos.y1)
        ]);

        return polygon;
    }

    draw() {
        var r = this._getRelativePosition();
        stroke(0);
        line(this._anchor.pos.x + r.x0, this._anchor.pos.y + r.y0, this._anchor.pos.x + r.x1, this._anchor.pos.y + r.y1);
    }

    trigger() {
        var direction = this._type == 'left' ? 'right' : 'left';
        this._anchor.turn(direction);
    }
}