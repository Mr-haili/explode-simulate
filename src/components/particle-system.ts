import {
  Particle,
  ParticleRender,
  PVector2
} from './';
import {
  ParticleRecord
} from './types';
import {
  Sprite
} from 'spritejs';

/**
 * 布局系统，更新计算每个particle的状态
 */
export class ParticleLayouter {
  // 跟新当前粒子的加速度，速度，位置，这个可以抽象出一个策略系统？
  updateParticle(particle: Particle): void {
    console.log('@@@')

    let {velocity, position, acceleration, age } = particle;

    velocity = velocity.add(acceleration);
    position = position.add(velocity);
    age += 1 // todo 这个应该是可以配置的

    console.log('!!!', position);

    Object.assign(particle, { velocity, position, acceleration, age});
  }

  // 更新所有粒子位置
  update(particles: ReadonlyArray<Particle>): void {
    particles.forEach(particle => this.updateParticle(particle));
  }
}

export class ParticleSystem {
  private _particleRecords: ParticleRecord[];

  constructor(
    private _layouter: ParticleLayouter,
    private _render: ParticleRender
  ) {
    this._particleRecords = [];
  }

  // 这里我们可以抽象出一个发射器，用来负责粒子的初始化
  emit(
    position: PVector2,
    size: PVector2,
    acceleration: PVector2,
    velocity: PVector2
  ): void {
    const particle = new Particle(
      position,
      size,
      acceleration,
      velocity
    );
    this._particleRecords.push({ particle, sprite: null });
  }

  // 布局渲染
  run(): void {
    const records = this._particleRecords;
    this._layouter.update(this._particleRecords.map(r => r.particle));
    // this._removeDeadRecords();
    this._render.draw(records);
  }

  // 移除已经死亡的粒子
  private _removeDeadRecords(): void {
    const records = this._particleRecords;
    records.forEach(record => {
      if(!record.particle.isDead) return;
      record.sprite.remove(); // 移除精灵
      record.sprite = null;
    })
    this._particleRecords = records.filter(record => record.particle.isDead);
  }
}