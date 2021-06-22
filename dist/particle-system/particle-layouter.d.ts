import { Particle } from "./";
/**
 * 布局系统，更新计算每个particle的状态
 */
export declare class ParticleLayouter {
    updateParticle(particle: Particle): void;
    update(particles: ReadonlyArray<Particle>): void;
}
