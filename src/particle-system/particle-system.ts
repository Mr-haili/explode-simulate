import {
  Particle,
  ParticleRender,
  ParticleLayouter,
  PVector2
} from './';
import {
  ParticleRecord
} from './types';


export class ParticleSystem {
  private _particles: Particle[];

  constructor(
    private _layouter: ParticleLayouter,
    private _render: ParticleRender
  ) {
    this._particles = [];
  }

  // 这里我们可以抽象出一个发射器，用来负责粒子的初始化
  emit(particle: Particle): void {
    this._particles.push(particle);
  }

  initRun(): void {
    this._render.draw(this._particles);
  }

  // 布局渲染
  run(): void {
    this._layouter.update(this._particles);
    this._removeDeadParticles();
    this._render.draw(this._particles);
  }

  // 移除已经死亡的粒子
  private _removeDeadParticles(): void {
    this._particles = this._particles.filter(particle => !particle.isDead);
  }
}
