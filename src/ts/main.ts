import Graphics from "./engine/graphics";
import LoopHandler from "./core/loop-handler";
import Player from "./entities/player";
import { vec2 } from "./utils/utils";
import Camera from "./engine/camera";
import World from "./world/world";
import { Wall } from "./world/world-object";

class Game {
    private canvas: HTMLCanvasElement;
    private graphics: Graphics;
    private loopHandler: LoopHandler;
    private player: Player;
    private world: World;

    constructor() {
        this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.graphics = new Graphics(this.canvas);
        this.loopHandler = new LoopHandler();

        this.player = new Player(new vec2(100, 100), 45);
        this.world = new World(new vec2(100, 100));

        const wall1 = new Wall(new vec2(200, 200), new vec2(50, 50));
        const wall2 = new Wall(new vec2(300, 300), new vec2(250, 50));
        this.world.objects.push(wall1, wall2);
    }

    update(deltaTime: number) {
        // console.log(`FPS: ${1000 / deltaTime}`);
        this.player.update(deltaTime, this.world);
        this.graphics.render([this.player], this.world.objects);
    }

    init() {
        this.graphics.init();

        const mainCamera = new Camera(this.player.position, 1);
        this.graphics.setCamera(mainCamera);

        this.loopHandler.start(this.update.bind(this));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    game.init();
});