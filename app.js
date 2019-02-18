let view_width = 1280;
let view_height = 720;

let draw_objects = [];
let moving_objects = [];
let static_objects = [];
let player;


function setup() {
    createCanvas(view_width, view_height);
    for (let index = 0; index < 200; index++) {
        var moving_obj = new CObject({
            x: random(100, view_width - 100),
            y: random(100, view_height - 100)
        }, random(3, 6), {
            r: random(255),
            g: random(255),
            b: random(255)
        });

        draw_objects.push(moving_obj);
        moving_objects.push(moving_obj);
    }

    addWall(0, 0, 1280, 30);
    addWall(0, 0, 30, 720);
    addWall(1250, 0, 30, 720);
    addWall(0, 690, 1280, 30);

    addWall(800, 500, 100, 100);
    addWall(200, 100, 500, 50);
    addWall(200, 400, 20, 200);
    addWall(900, 300, 200, 50);

    player = new CObject({
        x: view_width / 2,
        y: view_height / 2
    }, 20, {
        r: 255,
        g: 0,
        b: 0
    });
    //player.auto = false;
    player.speed = 6;

    draw_objects.push(player);
    moving_objects.push(player);



    frameRate(30);
}

function addWall(x, y, w, h) {
    var wall = new StaticObject({
        x: x,
        y: y
    }, {
        width: w,
        height: h
    });

    draw_objects.push(wall);
    static_objects.push(wall);
}

function draw() {
    background(150, 150, 150);

    moving_objects.forEach(element => {
        element.update();

        //collision detection
        for (let index = 0; index < static_objects.length; index++) {
            const s = static_objects[index];
            var v = element.visionBox.toPolygon(element.pos, element.angle);
            var p = new SAT.Box(new SAT.Vector(s.pos.x, s.pos.y), s.size.width, s.size.height);
            var response = new SAT.Response();

            var b = SAT.testPolygonPolygon(v, p.toPolygon(), response);
            if (b == true) {
                if (element.crazy.value == false) {

                    //console.log(response);
                    element.crazy.active();
                }

                break;
            } else {
                element.crazy.deactive();
            }
        }
    });

    draw_objects.forEach(element => {
        element.draw();
    });
}