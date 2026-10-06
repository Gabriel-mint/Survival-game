import Graphics from "./engine/graphics";
import LoopHandler from "./core/loop-handler";
import Player from "./entities/player";
import { vec2 } from "./utils/utils";
import Camera from "./engine/camera";
import World from "./world/world";
import { Barel, Wall } from "./world/world-object";

class Game {
    private canvas: HTMLCanvasElement;
    private graphics: Graphics;
    private loopHandler: LoopHandler;
    private player: Player;
    private world: World;
    private mainCamera: Camera;

    constructor() {
        this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.graphics = new Graphics(this.canvas);
        this.loopHandler = new LoopHandler();

        this.player = new Player(new vec2(100, 100), 45);
        this.world = new World(new vec2(100, 100));
        this.mainCamera = new Camera(this.player.position, 1);

        const wall1 = new Wall(new vec2(200, 200), new vec2(50, 50));
        const wall2 = new Wall(new vec2(300, 300), new vec2(400, 50));
        const barel = new Barel(new vec2(-400, 400), 30);
        this.world.objects.push(wall1, wall2, barel);
    }

    update(deltaTime: number) {
        // console.log(`FPS: ${1 / deltaTime}, Delta Time: ${deltaTime}`);
        this.player.update(deltaTime, this.world);
        this.mainCamera.position = this.player.position;
        this.graphics.render([this.player], this.world.objects);
    }

    init() {
        this.graphics.init();

        this.mainCamera = new Camera(this.player.position, 1);
        this.graphics.setCamera(this.mainCamera);

        this.loopHandler.start(this.update.bind(this));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    game.init();
});
