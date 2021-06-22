import { Particle } from "./";
export declare class ParticleRender {
    private _canvas;
    private _ctx;
    constructor(selector: string);
    draw(particles: ReadonlyArray<Readonly<Particle>>): void;
}
