let view_width = 1280;
let view_height = 720;

let draw_objects = [];
let moving_objects = [];
let static_objects = [];
let player;

let responses = [];


function setup() {
    createCanvas(view_width, view_height);
    for (let index = 0; index < 0; index++) {
        var moving_obj = new CObject({
            x: random(30, view_width),
            y: random(30, view_height)
        }, random(10, 30), {
            r: random(255),
            g: random(255),
            b: random(255)
        });

        draw_objects.push(moving_obj);
        moving_objects.push(moving_obj);
    }

    player = new CObject({
        x: view_width / 2,
        y: view_height / 2
    }, 20, {
        r: 255,
        g: 0,
        b: 0
    });
    player.auto = false;
    player.speed = 10;

    draw_objects.push(player);
    moving_objects.push(player);

    var wall = new StaticObject({
        x: 1200,
        y: 60
    }, {
        width: 60,
        height: 600
    });

    draw_objects.push(wall);
    static_objects.push(wall);

    frameRate(30);
}

function draw() {
    background(150, 150, 150);

    moving_objects.forEach(element => {
        element.update();

        element.pos.x = constrain(element.pos.x, 0 + element.radius, view_width - element.radius);
        element.pos.y = constrain(element.pos.y, 0 + element.radius, view_height - element.radius);

        //collision detection
        static_objects.forEach(s => {
            //console.log(s);
            var c = new SAT.Circle(new SAT.Vector(element.pos.x, element.pos.y), element.detection.r);
            var p = new SAT.Box(new SAT.Vector(s.pos.x, s.pos.y), s.size.width, s.size.height);
            var response = new SAT.Response();

            var b = SAT.testCirclePolygon(c, p.toPolygon(), response);

            if (b == true) {
                //console.clear();
                console.log(response);
            }

        });
    });

    draw_objects.forEach(element => {
        element.draw();
    });
}