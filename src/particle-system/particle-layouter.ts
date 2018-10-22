import {
  PVector2,
  Particle
} from './'

/**
 * 布局系统，更新计算每个particle的状态
 */
export class ParticleLayouter {
  // 跟新当前粒子的加速度，速度，位置，这个可以抽象出一个策略系统？
  updateParticle(particle: Particle) {
    let {velocity, position, acceleration, age } = particle;

    const dAcceleration = acceleration.normalize().multiply(0.2);
    acceleration = acceleration.subtract(dAcceleration);// todo 写死的常量加速度会不断衰减
    velocity = velocity.add(acceleration);
    position = position.add(velocity);
    age += 1 // todo 这个应该是可以配置的

    Object.assign(particle, { velocity, position, acceleration, age});
  }

  // 更新所有粒子位置
  update(particles: ReadonlyArray<Particle>): void {
    for(let particle of particles) {
      this.updateParticle(particle);
    }
  }
}
