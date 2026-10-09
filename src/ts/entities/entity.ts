import type { Renderer } from "../engine/graphics";
import { Circle, Rect, vec2 } from "../utils/utils";
import type World from "../world/world";

export default abstract class entity {
    public position: vec2;
    public orientation: number;
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
        this.orientation = 0;

        this.velocity = new vec2(0, 0);
        this.health = 100;
    }

    get hitbox(): Circle {
        return new Circle(this.position, this.size);
    }

    abstract render(renderer: Renderer): void;

    abstract updateVelocity(deltaTime: number): void;

    abstract updateOrientation(): void;

    display(renderer: Renderer): void {
        this.render(renderer);
    }

    moveAndCollide(deltaTime: number, world: World): void {
        let nextPosition = this.position.add(this.velocity.multiply(deltaTime));

        for (const object of world.objects) {
            if (object.hitboxType == "rect") {
                const rect = object.hitbox as Rect;
                const closestX = Math.max(rect.x, Math.min(nextPosition.x, rect.x + rect.width));
                const closestY = Math.max(rect.y, Math.min(nextPosition.y, rect.y + rect.height));
                const offsetX = nextPosition.x - closestX;
                const offsetY = nextPosition.y - closestY;
                const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

                if (distance >= this.size) continue;

                let normal: vec2;
                let penetration: number;

                if (distance > 0) {
                    normal = new vec2(offsetX / distance, offsetY / distance);
                    penetration = this.size - distance;
                } else {
                    const distances = [
                        { distance: nextPosition.x - rect.x, normal: new vec2(-1, 0) },
                        { distance: rect.x + rect.width - nextPosition.x, normal: new vec2(1, 0) },
                        { distance: nextPosition.y - rect.y, normal: new vec2(0, -1) },
                        { distance: rect.y + rect.height - nextPosition.y, normal: new vec2(0, 1) },
                    ];
                    const nearestEdge = distances.reduce((nearest, edge) =>
                        edge.distance < nearest.distance ? edge : nearest,
                    );
                    normal = nearestEdge.normal;
                    penetration = this.size + nearestEdge.distance;
                }

                nextPosition = nextPosition.add(normal.multiply(penetration));

                const velocityIntoSurface = this.velocity.x * normal.x + this.velocity.y * normal.y;
                if (velocityIntoSurface < 0) {
                    this.velocity = this.velocity.subtract(normal.multiply(velocityIntoSurface));
                }
            } else if (object.hitboxType == "circle") {
                const circle = object.hitbox as Circle;
                const offsetX = nextPosition.x - circle.center.x;
                const offsetY = nextPosition.y - circle.center.y;
                const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

                if (distance < this.size + circle.radius) {
                    const normal = new vec2(offsetX / distance, offsetY / distance);
                    const penetration = this.size + circle.radius - distance;
                    nextPosition = nextPosition.add(normal.multiply(penetration));
                }
            }
        }

        this.position = nextPosition;
    }

    update(deltaTime: number, world: World): void {
        this.updateVelocity(deltaTime);
        this.moveAndCollide(deltaTime, world);
        this.updateOrientation();
    }
}
