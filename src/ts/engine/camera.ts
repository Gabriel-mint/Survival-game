import { vec2, Rect } from "../utils/utils";

export default class Camera {
    public position: vec2;
    public zoom: number;

    constructor(position: vec2 = new vec2(0, 0), zoom: number = 1) {
        this.position = position;
        this.zoom = zoom;
    }

    worldPosToScreen(worldPos: vec2): vec2 {
        return new vec2(
            (worldPos.x - this.position.x) * this.zoom,
            (worldPos.y - this.position.y) * this.zoom
        );
    }

    screenPosToWorld(screenPos: vec2): vec2 {
        return new vec2(
            screenPos.x / this.zoom + this.position.x,
            screenPos.y / this.zoom + this.position.y
        );
    }

    worldRectToScreen(worldRect: Rect): Rect {
        const topLeft = this.worldPosToScreen(worldRect.topLeft);
        const bottomRight = this.worldPosToScreen(worldRect.bottomRight);

        return new Rect(
            topLeft.x,
            topLeft.y,
            bottomRight.x - topLeft.x,
            bottomRight.y - topLeft.y
        );
    }

    screenRectToWorld(screenRect: Rect): Rect {
        const topLeft = this.screenPosToWorld(screenRect.topLeft);
        const bottomRight = this.screenPosToWorld(screenRect.bottomRight);

        return new Rect(
            topLeft.x,
            topLeft.y,
            bottomRight.x - topLeft.x,
            bottomRight.y - topLeft.y
        );
    }
}