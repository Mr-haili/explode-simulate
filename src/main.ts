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
  const { particles, width, height } = await imageDiscretizate(imageSrc, 30);

  const layouter = new ParticleLayouter();
  const render = new ParticleRender('#demo-quickStart');
  const particleSystem = new ParticleSystem(
    layouter,
    render
  );

  console.log('粒子数量：', particles.length);
  // if(particles.length > 10000) return;

  for(let particle of particles) {
    const acceleration = new PVector2(2 * Math.random(), 2 * Math.random());
    const velocity = new PVector2(5 * Math.random(), 5 * Math.random());

    Object.assign(particle, { acceleration, velocity });

    particleSystem.emit(particle);
  }

  console.log('!!!---初始化完成---');

  let total = 0;
  let gap = 16.6;
  let intervalId = setInterval(() => {
    if(total >= 16.6) {
      clearInterval(intervalId);
      return;
    }
    console.log('----一轮------');
    particleSystem.run();
    total += gap;
  }, gap);
}

console.log('---- lets rock ----');
go();
