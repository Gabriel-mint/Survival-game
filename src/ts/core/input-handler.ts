import { vec2 } from "../utils/utils";

export class keyboardInputHandler {
    private keys = new Set<string>();

    constructor() {
        window.addEventListener("keydown", (event) => {
            this.keys.add(event.key);
        });

        window.addEventListener("keyup", (event) => {
            this.keys.delete(event.key);
        });
    }

    isKeyPressed(key: string): boolean {
        return this.keys.has(key);
    }
}

export class mouseInputHandler {
    private mousePosition: vec2 = new vec2(0, 0);
    private mouseButtons = new Set<number>();

    constructor() {
        window.addEventListener("mousemove", (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });

        window.addEventListener("mousedown", (event) => {
            this.mouseButtons.add(event.button);
        });

        window.addEventListener("mouseup", (event) => {
            this.mouseButtons.delete(event.button);
        });
    }

    getMousePosition(): vec2 {
        return this.mousePosition;
    }

    isMouseButtonPressed(button: number): boolean {
        return this.mouseButtons.has(button);
    }
}