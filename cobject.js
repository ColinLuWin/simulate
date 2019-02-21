import visionLine from "./visionLine.js";
import boundingCircle from "./boundingCircle.js";

export default class CObject {
    constructor(pos, radius, color) {
        this.pos = pos;
        this.lastPos = pos;
        this.radius = radius;
        this.color = color;
        this.auto = true;
        this.angle = radians(random(360));
        this.speed = random(2, 2);

        this.visionLines = {
            left: new visionLine(this, 100, 'left'),
            right: new visionLine(this, 100, 'right')
        };

        this.boundingCircle = new boundingCircle(this, this.radius + 30);

        this.crazy = {
            value: false
        }
    }

    turn(direction) {
        if (direction == 'right')
            this.angle += radians(5);
        if (direction == 'left')
            this.angle += radians(-5);
    }

    go(direction) {
        this.lastPos = {
            x: this.pos.x,
            y: this.pos.y
        };

        if (direction == 'forward') {
            this.pos.x += this.speed * cos(this.angle);
            this.pos.y += this.speed * sin(this.angle);
        }

        if (direction == 'backward') {
            this.pos.x -= this.speed * .5 * cos(this.angle);
            this.pos.y -= this.speed * .5 * sin(this.angle);
        }
    }

    backToOldPosition() {
        this.pos.x = this.lastPos.x;
        this.pos.y = this.lastPos.y;
    }

    update() {

        if (this.auto == true) {
            this._move();
            return;
        }

        if (keyIsDown(68)) {
            this.turn('right');
        }

        if (keyIsDown(65)) {
            this.turn('left');
        }

        if (keyIsDown(87)) {
            this.go('forward');
        }

        if (keyIsDown(83)) {
            this.go('backward');
        }
    }

    _move() {
        if (this.crazy.value == false) {
            var diffAngle = random(5);
            this.angle += random(radians(-diffAngle), radians(diffAngle));
        }

        this.go('forward');
    }

    draw() {
        //self
        fill(this.color.r, this.color.g, this.color.b);
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

        this.boundingCircle.draw();
        this.visionLines.left.draw();
        this.visionLines.right.draw();
    }
}