export class vec2 {
    x: number;
    y: number;

    constructor(x: number, y?: number) {
        this.x = x;
        this.y = y ?? x;
    }

    add(other: vec2): vec2 {
        return new vec2(this.x + other.x, this.y + other.y);
    }

    subtract(other: vec2): vec2 {
        return new vec2(this.x - other.x, this.y - other.y);
    }

    multiply(scalar: number): vec2 {
        return new vec2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): vec2 {
        return new vec2(this.x / scalar, this.y / scalar);
    }

    get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get normal(): vec2 {
        const length = this.length;

        if (length === 0) return new vec2(0, 0);
        return this.divide(length);
    }
}

export class Rect {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point: vec2): boolean {
        return (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        );
    }

    overlaps(other: Rect): boolean {
        return !(
            this.x + this.width < other.x ||
            this.x > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y > other.y + other.height
        );
    }

    get topLeft(): vec2 {
        return new vec2(this.x, this.y);
    }

    get bottomRight(): vec2 {
        return new vec2(this.x + this.width, this.y + this.height);
    }

    get center(): vec2 {
        return new vec2(this.x + this.width / 2, this.y + this.height / 2);
    }
}

export class Circle {
    public center: vec2;
    public radius: number;

    constructor(center: vec2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    contains(point: vec2): boolean {
        const distanceSquared = (point.x - this.center.x) ** 2 + (point.y - this.center.y) ** 2;
        return distanceSquared <= this.radius ** 2;
    }

    collidesWithRect(rect: Rect): boolean {
        const closestX = Math.max(rect.x, Math.min(this.center.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(this.center.y, rect.y + rect.height));

        const distanceSquared = (closestX - this.center.x) ** 2 + (closestY - this.center.y) ** 2;
        return distanceSquared <= this.radius ** 2;
    }
}