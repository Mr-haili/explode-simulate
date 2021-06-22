import { Particle, ParticleRender, ParticleLayouter } from './';
export declare class ParticleSystem {
    private _layouter;
    private _render;
    private _particles;
    constructor(_layouter: ParticleLayouter, _render: ParticleRender);
    emit(particle: Particle): void;
    initRun(): void;
    run(): void;
    private _removeDeadParticles;
}
