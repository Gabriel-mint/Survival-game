import { Renderer } from "../engine/graphics";
import { vec2, Rect } from "../utils/utils";
import entity from "./entity";
import { keyboardInputHandler, mouseInputHandler } from "../core/input-handler";

export default class Player extends entity {
    private keyboardInputHandler: keyboardInputHandler;
    private mouseInputHandler: mouseInputHandler;
    private screenPosition: vec2 | null = null;

    constructor(position: vec2, size: number) {
        super(position, size);

        this.keyboardInputHandler = new keyboardInputHandler();
        this.mouseInputHandler = new mouseInputHandler();

        this.maxSpeed = 300;
        this.acceleration = 20;
        this.friction = 0.93;
    }

    override render(renderer: Renderer): void {
        const screenRect = renderer.drawRect(
            new Rect(this.position.x - this.size / 2, this.position.y - this.size, this.size, this.size * 2),
            [255, 0, 0, 1],
            "relative",
            this.orientation,
        );
        this.screenPosition = screenRect.center;
    }

    override updateVelocity(deltaTime: number): void {
        const direction = new vec2(0, 0);

        if (this.keyboardInputHandler.isKeyPressed("ArrowUp")) direction.y--;
        if (this.keyboardInputHandler.isKeyPressed("ArrowDown")) direction.y++;
        if (this.keyboardInputHandler.isKeyPressed("ArrowLeft")) direction.x--;
        if (this.keyboardInputHandler.isKeyPressed("ArrowRight")) direction.x++;

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

    override updateOrientation(): void {
        if (!this.screenPosition) return;

        const mousePos = this.mouseInputHandler.getMousePosition();
        const directionToMouse = mousePos.subtract(this.screenPosition);
        this.orientation = Math.atan2(directionToMouse.y, directionToMouse.x);
    }
}
