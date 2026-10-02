export default class LoopHandler {
    private lastTime: number | null;

    constructor() {
        this.lastTime = 0;
        this.lastTime = null;
    }

    start(callback: (deltaTime: number) => void): void {
        const loop = (currentTime: number) => {
            const deltaTime = this.lastTime === null ? 0 : currentTime - this.lastTime;
            this.lastTime = currentTime;

            callback(deltaTime / 1000); // Convert to seconds
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}