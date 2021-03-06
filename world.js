import CObject from './cobject.js'
import StaticObject from './staticobject.js'

export default class world {
    constructor(cfg) {
        this.config = cfg;
        this.objects = [];
        this.static_objects = [];
        this.moving_objects = [];

        for (let index = 0; index < cfg.simCount; index++) {
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

        //create walls
        this._addWall(0, 0, 1280, 30);
        this._addWall(0, 0, 30, 720);
        this._addWall(1250, 0, 30, 720);
        this._addWall(0, 690, 1280, 30);

        this._addWall(800, 500, 100, 100);
        this._addWall(200, 100, 500, 50);
        this._addWall(200, 300, 20, 400);
        this._addWall(300, 150, 20, 400);
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
                var p = new SAT.Box(new SAT.Vector(s.pos.x, s.pos.y), s.size.width, s.size.height).toPolygon();

                var vleft = o.visionLines.left.toPolygon();
                var bleft = SAT.testPolygonPolygon(vleft, p, null);
                if (bleft == true) {
                    o.visionLines.left.trigger();
                }

                var vright = o.visionLines.right.toPolygon();
                var bright = SAT.testPolygonPolygon(vright, p, null);
                if (bright == true) {
                    o.visionLines.right.trigger();
                }

                var bounding = SAT.testCirclePolygon(o.boundingCircle.toCircle(), p, null);
                if (bounding == true) {
                    o.boundingCircle.trigger();
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