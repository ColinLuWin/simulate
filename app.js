let objects = [];
let view_width = 1280;
let view_height = 720;

function backToCenter(element) {
    element.pos = {
        x: view_width / 2,
        y: view_height / 2
    };
}

function setup() {
    createCanvas(view_width, view_height);
    for (let index = 0; index < 10; index++) {
        objects.push(new CObject({
            x: random(20, view_width),
            y: random(20, view_height)
        }, random(10, 30), {
            r: random(255),
            g: random(255),
            b: random(255)
        }));
    }
    console.table(objects);
    frameRate(30);
}

function draw() {
    background(150, 150, 150);

    if (keyIsDown(RIGHT_ARROW)) {
        objects[0].turn('right');
    }

    if (keyIsDown(LEFT_ARROW)) {
        objects[0].turn('left');
    }

    if (keyIsDown(UP_ARROW)) {
        objects[0].go('forward');
    }

    if (keyIsDown(DOWN_ARROW)) {
        objects[0].go('backward');
    }

    objects.forEach(element => {
        element.update();

        // if (element.pos.x < 0 || element.pos.x > view_width)
        //     backToCenter(element);

        // if (element.pos.y < 0 || element.pos.y > view_height)
        //     backToCenter(element);
        element.pos.x = constrain(element.pos.x, 0 + element.radius, view_width - element.radius);
        element.pos.y = constrain(element.pos.y, 0 + element.radius, view_height - element.radius);
    });

    objects.forEach(element => {
        element.draw();
    });
}

// function keyPressed() {
//     console.log(key);
//     //console.log(key.charCode);

//     if (key == 'ArrowRight') {
//         objects[0].turn('right');
//     }
// }