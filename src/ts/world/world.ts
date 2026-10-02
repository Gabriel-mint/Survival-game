import type { vec2 } from "../utils/utils";
import type WorldObject from "./world-object";


export default class World {
    public objects: WorldObject[];
    public size: vec2;

    constructor(size: vec2) {
        this.size = size;
        this.objects = [];
    }
}