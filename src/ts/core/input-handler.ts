export class keyboardInputHandler {
    private keys = new Set<string>();

    constructor() {
    }

    init(): void {
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