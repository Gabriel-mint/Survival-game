import type entity from "../entities/entity";
import { Circle, Rect } from "../utils/utils";
import type WorldObject from "../world/world-object";
import Camera from "./camera";

export type DrawSpace = "absolute" | "relative";
export type Color = [number, number, number, number?];

export class Renderer {
    private camera: Camera | null;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, camera: Camera | null) {
        this.context = context;
        this.camera = camera;
    }

    setCamera(camera: Camera | null) {
        this.camera = camera;
    }

    drawRect(rect: Rect, color: Color, space: DrawSpace) {
        if (this.camera && space === "relative") {
            const screenRect = this.camera.worldRectToScreen(rect);
            screenRect.x += this.context.canvas.width / 2;
            screenRect.y += this.context.canvas.height / 2;

            this.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ?? 1})`;
            this.context.fillRect(screenRect.x, screenRect.y, screenRect.width, screenRect.height);
        } else {
            this.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ?? 1})`;
            this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    drawCircle(circle: Circle, color: Color, space: DrawSpace) {
        if (this.camera && space === "relative") {
            const screenCenter = this.camera.worldPosToScreen(circle.center);
            screenCenter.x += this.context.canvas.width / 2;
            screenCenter.y += this.context.canvas.height / 2;

            const screenRadius = circle.radius * this.camera.zoom;

            this.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ?? 1})`;
            this.context.beginPath();
            this.context.arc(screenCenter.x, screenCenter.y, screenRadius, 0, Math.PI * 2);
            this.context.fill();
        } else {
            this.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] ?? 1})`;
            this.context.beginPath();
            this.context.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2);
            this.context.fill();
        }
    }
}

export default class Graphics {
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.renderer = new Renderer(context, null);
    }

    setCamera(camera: Camera) {
        this.renderer.setCamera(camera);
    }

    resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init(): void {
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();
    }

    render(entities: entity[], worldObjects: WorldObject[]): void {
        this.renderer.drawRect(new Rect(0, 0, this.canvas.width, this.canvas.height), [0, 0, 0], "absolute");
        worldObjects.forEach((worldObject) => worldObject.render(this.renderer));
        entities.forEach((entity) => entity.render(this.renderer));
    }
}