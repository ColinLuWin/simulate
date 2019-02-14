class CObject {
    constructor(pos, radius, color) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;

        this.angle = radians(0);

        this.speed = random(2, 8);

        this.vision = {
            len: random(this.radius + 30, this.radius + 300),
            angle: radians(random(10, 80))
        };
    }

    turn(direction) {
        if (direction == 'right')
            this.angle += radians(5);
        if (direction == 'left')
            this.angle += radians(-5);
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
        this.move();
    }

    move() {
        var diffAngle = random(10);
        this.angle += random(radians(-diffAngle), radians(diffAngle));
        this.go('forward');
    }

    draw() {
        var r = this.radius * 2

        //self
        fill(this.color.r, this.color.g, this.color.b);
        ellipse(this.pos.x, this.pos.y, r, r);

        //vision
        fill(255, 255, 255, 75);
        arc(this.pos.x, this.pos.y, this.vision.len, this.vision.len, this.angle - this.vision.angle, this.angle + this.vision.angle);

        stroke(255);
        line(this.pos.x, this.pos.y, this.pos.x + this.radius * cos(this.angle), this.pos.y + this.radius * sin(this.angle));
    }
}