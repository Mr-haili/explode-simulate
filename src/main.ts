import {
  Particle,
  ParticleLayouter,
  ParticleRender,
  ParticleSystem,
  PVector2
} from './particle-system';
import {
  Scene,
  Sprite
} from 'spritejs';
import {
  imageDiscretizate
} from './discretizate';
import {
  imageSrc
} from './image-src';

async function go(): Promise<void> {
  const { particles, width, height } = await imageDiscretizate(imageSrc, 65);

  const layouter = new ParticleLayouter();
  const render = new ParticleRender('#demo-quickStart');
  const particleSystem = new ParticleSystem(
    layouter,
    render
  );

  /**
   * 令粒子坐标为Vp，爆炸中心点坐标为Vc，
   * 那么获得中心点指向粒子的方向向量为V = Vp - Vc
   * 粒子的速度和加速度的方向应该和V是保持一直的
   * 
   */
  const pCenter = new PVector2(width / 2, height / 2);
  const offsetPVector = new PVector2(300, 300);
  for(let particle of particles) {
    const { position } = particle;
    const escapeDirection = position.subtract(pCenter);

    // const acceleration = escapeDirection.multiply(0.05 * Math.random());
    const velocity = escapeDirection.normalize().multiply(2);

    // 先让初始速度为0
    // const velocity = new PVector2(5 * Math.random(), 5 * Math.random());

    // 给个总体偏移。。
    particle.position = position.add(offsetPVector);

    Object.assign(particle, { velocity });

    particleSystem.emit(particle);
  }

  let total = 0, gap = 16.6;

  particleSystem.initRun();

  let intervalId = setInterval(() => {
    if(total >= 1000) {
      clearInterval(intervalId);
      return;
    }
    particleSystem.run();
    total += gap;
  }, gap);
}

console.log('---- lets rock ----');
go();

