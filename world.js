import CObject from './cobject.js'
import StaticObject from './staticobject.js'

export default class world {
    constructor(cfg) {
        this.config = cfg;
        this.objects = [];
        this.static_objects = [];
        this.moving_objects = [];

        for (let index = 0; index < 200; index++) {
            var moving_obj = new CObject({
                x: random(100, this.config.viewport.width - 100),
                y: random(100, this.config.viewport.height - 100)
            }, random(3, 6), {
                r: random(255),
                g: random(255),
                b: random(255)
            });

            this.moving_objects.push(moving_obj);
            this.objects.push(moving_obj);
        }

        this.player = new CObject({
            x: this.config.viewport.width / 2,
            y: this.config.viewport.height / 2
        }, 20, {
            r: 255,
            g: 0,
            b: 0
        });
        //this.player.auto = false;
        this.player.speed = 6;

        this.moving_objects.push(this.player);
        this.objects.push(this.player);

        //create walls
        this._addWall(0, 0, 1280, 30);
        this._addWall(0, 0, 30, 720);
        this._addWall(1250, 0, 30, 720);
        this._addWall(0, 690, 1280, 30);

        this._addWall(800, 500, 100, 100);
        this._addWall(200, 100, 500, 50);
        this._addWall(200, 400, 20, 200);
        this._addWall(900, 300, 200, 50);
    }

    _addWall(x, y, w, h) {
        var wall = new StaticObject({
            x: x,
            y: y
        }, {
            width: w,
            height: h
        });

        this.objects.push(wall);
        this.static_objects.push(wall);
    }

    update() {
        this.moving_objects.forEach(o => {
            o.update();

            //collision detection
            for (let index = 0; index < this.static_objects.length; index++) {
                const s = this.static_objects[index];
                var v = o.visionBox.toPolygon(o.pos, o.angle);
                var p = new SAT.Box(new SAT.Vector(s.pos.x, s.pos.y), s.size.width, s.size.height);
                var response = new SAT.Response();

                var b = SAT.testPolygonPolygon(v, p.toPolygon(), response);
                if (b == true) {
                    if (o.crazy.value == false) {

                        //console.log(response);
                        o.crazy.active();
                    }

                    break;
                } else {
                    o.crazy.deactive();
                }
            }
        });
    }

    draw() {
        this.objects.forEach(o => {
            o.draw();
        });
    }
}