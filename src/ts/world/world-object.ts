import { vec2, Circle, Rect } from "../utils/utils";

type Hitbox = Circle | Rect;
type HitboxType = "circle" | "rect";

export default abstract class WorldObject {
    public position: vec2;

    constructor(position: vec2) {
        this.position = position;
    }

    abstract hitboxType: HitboxType;
    abstract get hitbox(): Hitbox;

    render(renderer: any): void {
        if (this.hitboxType === "circle") {
            renderer.drawCircle(this.hitbox as Circle, [255, 0, 0], "relative");
        } else if (this.hitboxType === "rect") {
            renderer.drawRect(this.hitbox as Rect, [255, 0, 0], "relative");
        }
    }
}

export class Wall extends WorldObject {
    public hitboxType: HitboxType = "rect";
    public size: vec2;

    constructor(position: vec2, size: vec2) {
        super(position);
        this.size = size;
    }

    get hitbox(): Rect {
        return new Rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

export class Barel extends WorldObject {
    public hitboxType: HitboxType = "circle";
    public radius: number;

    constructor(position: vec2, radius: number) {
        super(position);
        this.radius = radius;
    }

    get hitbox(): Circle {
        return new Circle(this.position, this.radius);
    }
}
