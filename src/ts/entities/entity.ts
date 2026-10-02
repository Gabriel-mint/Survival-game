import type { Renderer } from "../engine/graphics";
import { Circle, Rect, vec2 } from "../utils/utils"
import type World from "../world/world";

export default abstract class entity {
    public position: vec2;
    public size: number;
    public maxSpeed: number;
    public acceleration: number;
    public friction: number;
    public velocity: vec2;
    public health: number;

    constructor(position: vec2, size: number) {
        this.position = position;
        this.size = size;

        this.maxSpeed = 0;
        this.acceleration = 0;
        this.friction = 0;

        this.velocity = new vec2(0, 0);
        this.health = 100;
    }

    get hitbox(): Circle {
        return new Circle(this.position, this.size);
    }

    render(renderer: Renderer): void {
        renderer.drawCircle(this.hitbox, [0, 255, 0], "relative");
    }

    updateVelocity(deltaTime: number): void {
    }

    moveAndCollide(deltaTime: number, world: World): void {
        for (const object of world.objects) {
            if (this.hitbox.collidesWithRect(object.hitbox as Rect)) {
                console.log(object.hitboxType);
            }
        }

        this.position = this.position.add(this.velocity.multiply(deltaTime));
    }

    update(deltaTime: number, world: World): void {
        this.updateVelocity(deltaTime);
        this.moveAndCollide(deltaTime, world);
    }
}