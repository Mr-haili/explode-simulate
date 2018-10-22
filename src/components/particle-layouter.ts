import {
  PVector2,
  Particle,
  
} from './'

/**
 * 布局系统，更新计算每个particle的状态
 */
export class ParticleLayouter {
  // 跟新当前粒子的加速度，速度，位置，这个可以抽象出一个策略系统？
  updateParticle(particle: Particle) {
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
