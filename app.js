import * as cfg from './config.js'
import world from './world.js'

let _world;

window.setup = function () {
    createCanvas(cfg.viewport.width, cfg.viewport.height);
    _world = new world(cfg);
    frameRate(30);
}

window.draw = function () {
    background(150, 150, 150);

    _world.update();
    _world.draw();
}