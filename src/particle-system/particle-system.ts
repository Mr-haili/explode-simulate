import {
  Particle,
  ParticleRender,
  PVector2
} from './';
import {
  ParticleRecord
} from './types';

/**
 * 布局系统，更新计算每个particle的状态
 */
export class ParticleLayouter {
  // 跟新当前粒子的加速度，速度，位置，这个可以抽象出一个策略系统？
  updateParticle(particle: Particle): void {
    let {velocity, position, acceleration, age } = particle;

    velocity = velocity.add(acceleration);
    position = position.add(velocity);
    age += 1 // todo 这个应该是可以配置的

    Object.assign(particle, { velocity, position, acceleration, age});
  }

  // 更新所有粒子位置
  update(particles: ReadonlyArray<Particle>): void {
    particles.forEach(particle => this.updateParticle(particle));
  }
}

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
    // this._removeDeadRecords();
    this._render.draw(this._particles);
  }

  // 移除已经死亡的粒子
  private _removeDeadRecords(): void {
    this._particles.filter(particle => particle.isDead);
  }
}
