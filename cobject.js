export default class CObject {
    constructor(pos, radius, color) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.auto = true;


        this.crazy = {
            value: false,
            direction: 1,
            active: function () {
                if (this.value == false) {
                    this.value = true;
                    //this.direction = random(0, 2) > 1 ? 1 : -1;
                }
            },
            deactive: function () {
                this.value = false;
            }
        }

        this.angle = radians(random(360));

        this.speed = random(8, 16);

        // this.vision = {
        //     len: random(10, 200),
        //     angle: radians(45)
        // };

        this.detection = {
            r: this.radius + 50
        }

        this.visionBox = {
            width: this.radius * 2,
            length: 100,
            getRectPositions: function (pos, angle) {

                var x0 = pos.x + this.width / 2 * cos(angle - radians(90));
                var y0 = pos.y + this.width / 2 * sin(angle - radians(90));

                var x1 = x0 + this.length * cos(angle);
                var y1 = y0 + this.length * sin(angle);

                var x3 = pos.x + this.width / 2 * cos(angle + radians(90));
                var y3 = pos.y + this.width / 2 * sin(angle + radians(90));

                var x2 = x3 + this.length * cos(angle);
                var y2 = y3 + this.length * sin(angle);

                return {
                    x0: x0,
                    y0: y0,
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    x3: x3,
                    y3: y3
                };
            },
            toPolygon: function (pos, angle) {
                var x0 = this.width / 2 * cos(angle - radians(90));
                var y0 = this.width / 2 * sin(angle - radians(90));

                var x1 = x0 + this.length * cos(angle);
                var y1 = y0 + this.length * sin(angle);

                var x3 = this.width / 2 * cos(angle + radians(90));
                var y3 = this.width / 2 * sin(angle + radians(90));

                var x2 = x3 + this.length * cos(angle);
                var y2 = y3 + this.length * sin(angle);

                var polygon = new SAT.Polygon(new SAT.Vector(pos.x, pos.y), [
                    new SAT.Vector(x0, y0),
                    new SAT.Vector(x1, y1),
                    new SAT.Vector(x2, y2),
                    new SAT.Vector(x3, y3)
                ]);

                return polygon;
            }
        }
    }

    turn(direction) {
        if (direction == 'right')
            this.angle += radians(10);
        if (direction == 'left')
            this.angle += radians(-10);
    }

    go(direction) {
        if (direction == 'forward') {
            this.pos.x += this.speed * cos(this.angle);
            this.pos.y += this.speed * sin(this.angle);
        }

        if (direction == 'backward') {
            this.pos.x -= this.speed * .5 * cos(this.angle);
            this.pos.y -= this.speed * .5 * sin(this.angle);
        }
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
        if (this.crazy.value == true) {
            this.angle += radians(10) * this.crazy.direction;
        } else {
            var diffAngle = random(5);
            this.angle += random(radians(-diffAngle), radians(diffAngle));

        }
        this.go('forward');
    }

    getVisionPolygon() {
        var v = new SAT.Polygon(new SAT.Vector(this.pos.x, this.pos.y), [
            new SAT.Vector(),
            new SAT.Vector(this.vision.len / 2 * cos(this.angle - this.vision.angle), this.vision.len / 2 * sin(this.angle - this.vision.angle)),
            new SAT.Vector(this.vision.len / 2 * cos(this.angle + this.vision.angle), this.vision.len / 2 * sin(this.angle + this.vision.angle))
        ]);

        return v;
    }

    draw() {
        var r = this.radius * 2

        //self
        fill(this.color.r, this.color.g, this.color.b);
        ellipse(this.pos.x, this.pos.y, r, r);

        //vision
        // fill(255, 255, 255, 75);
        // arc(this.pos.x, this.pos.y, this.vision.len, this.vision.len, this.angle - this.vision.angle, this.angle + this.vision.angle);

        //detection
        // fill(0, 255, 0, 75);
        // ellipse(this.pos.x, this.pos.y, this.detection.r * 2, this.detection.r * 2);

        // stroke(255);
        // line(this.pos.x, this.pos.y, this.pos.x + this.vision.len / 2 * cos(this.angle), this.pos.y + this.vision.len / 2 * sin(this.angle));

        // fill(0, 0, 255, 75);
        // var leftX = this.pos.x + this.vision.len / 2 * cos(this.angle - this.vision.angle);
        // var leftY = this.pos.y + this.vision.len / 2 * sin(this.angle - this.vision.angle);
        // var rightX = this.pos.x + this.vision.len / 2 * cos(this.angle + this.vision.angle);
        // var rightY = this.pos.y + this.vision.len / 2 * sin(this.angle + this.vision.angle);
        // triangle(this.pos.x, this.pos.y, leftX, leftY, rightX, rightY);

        fill(0, 0, 255, 75);
        var points = this.visionBox.getRectPositions(this.pos, this.angle);
        //quad(points.x0, points.y0, points.x1, points.y1, points.x2, points.y2, points.x3, points.y3);
    }
}