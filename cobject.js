import visionLine from "./visionLine.js";
import boundingCircle from "./boundingCircle.js";

const Modes = Object.freeze({
    Off: Symbol('off'),
    Wonder: Symbol('wonder'),
    Find: Symbol('find')
});

export default class CObject {
    constructor(pos, radius, color) {

        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.angle = radians(random(360));
        this.speed = random(2, 2);

        this.auto = {
            mode: Modes.Wonder,
            move: function (obj) {
                if (this.mode === Modes.Off)
                    return;

                if (this.mode === Modes.Find) {
                    // todo
                }

                if (this.mode === Modes.Wonder) {
                    var diffAngle = random(-20, 20);
                    obj.angle += random(radians(-diffAngle), radians(diffAngle));
                    obj.go('forward');
                }
            }
        }

        this.boundingCircle = new boundingCircle(this, this.radius + 30);

        this.visionLines = {
            left: new visionLine(this, 100, 'left'),
            right: new visionLine(this, 100, 'right')
        };
    }

    turn(direction) {
        if (direction == 'right')
            this.angle += radians(3);
        if (direction == 'left')
            this.angle += radians(-3);
    }

    go(direction) {
        if (direction == 'forward') {
            this.pos.x += this.speed * cos(this.angle);
            this.pos.y += this.speed * sin(this.angle);
        }

        if (direction == 'backward') {
            this.pos.x -= this.speed * cos(this.angle);
            this.pos.y -= this.speed * sin(this.angle);
        }
    }

    findWayOut() {
        this.auto.mode = Modes.Find;
    }

    update() {
        this.auto.move(this);

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

    draw() {
        //self
        fill(this.color.r, this.color.g, this.color.b);
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

        this.boundingCircle.draw();
        this.visionLines.left.draw();
        this.visionLines.right.draw();
    }
}