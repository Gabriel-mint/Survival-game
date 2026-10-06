import { Renderer } from "../engine/graphics";
import { vec2 } from "../utils/utils";
import entity from "./entity";
import { keyboardInputHandler } from "../core/input-handler";

export default class Player extends entity {
    private inputHandler: keyboardInputHandler;

    constructor(position: vec2, size: number) {
        super(position, size);
        this.inputHandler = new keyboardInputHandler();
        this.inputHandler.init();

        this.maxSpeed = 300;
        this.acceleration = 20;
        this.friction = 0.93;
    }

    override render(renderer: Renderer): void {
        renderer.drawCircle(this.hitbox, [0, 255, 0], "relative");
    }

    override updateVelocity(deltaTime: number): void {
        const direction = new vec2(0, 0);

        if (this.inputHandler.isKeyPressed("ArrowUp")) direction.y--;
        if (this.inputHandler.isKeyPressed("ArrowDown")) direction.y++;
        if (this.inputHandler.isKeyPressed("ArrowLeft")) direction.x--;
        if (this.inputHandler.isKeyPressed("ArrowRight")) direction.x++;

        // Accélération
        if (direction.length > 0) {
            this.velocity = this.velocity.add(direction.normal.multiply(this.acceleration));
        }

        // Friction
        this.velocity = this.velocity.multiply(this.friction);

        // Limite de vitesse
        if (this.velocity.length > this.maxSpeed) {
            this.velocity = this.velocity.normal.multiply(this.maxSpeed);
        }
    }
}
