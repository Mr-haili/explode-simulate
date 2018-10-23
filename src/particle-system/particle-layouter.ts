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

    const vLen = velocity.len();

    // 阻力正比于速度的平方 av^2 bv^3;
    const vPVector = velocity.normalize(); // 速度的方向向量
    const dAcceleration =
    PVector2.zero
      .add(vPVector.multiply(vLen * 0.001)) // todo 写死的常量
      .add(vPVector.multiply(vLen * vLen * 0.00005))
      .add(vPVector.multiply(vLen * vLen * vLen * 0.00005));

      acceleration = acceleration.subtract(dAcceleration);

    const newVelocity = velocity.add(acceleration);

    if(!(velocity.isZero() || newVelocity.normalize().equal(velocity.normalize()))) {
      particle.isDead = true;
      return;
    }
    position = position.add(newVelocity);
    age += 1 // todo 这个应该是可以配置的

    // 注意更新的速度需要时更新后的
    Object.assign(particle, { velocity: newVelocity, position, acceleration, age});
  }

  // 更新所有粒子位置
  update(particles: ReadonlyArray<Particle>): void {
    for(let particle of particles) {
      this.updateParticle(particle);
    }
  }
}
