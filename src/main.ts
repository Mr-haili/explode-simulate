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

async function initSystem(): Promise<ParticleSystem> {
  const { particles, width, height } = await imageDiscretizate(imageSrc, 40);

  const layouter = new ParticleLayouter();
  const render = new ParticleRender('#demo-quickStart');
  const particleSystem = new ParticleSystem(
    layouter,
    render
  );

  /**
   * 令粒子坐标为Vp，爆炸中心点坐标为Vc，
   * 那么获得中心点指向粒子的方向向量为V = Vp - Vc
   * 粒子的速度和加速度的方向应该和V是保持一致的
   *
   */
  const pCenter = new PVector2(width / 2, height / 2);
  const offsetPVector = new PVector2(300, 300);
  for(let particle of particles) {
    const { position } = particle;
    const escapeDirection = position.subtract(pCenter);

    const acceleration = escapeDirection.normalize().multiply(10 * Math.random());

    // 给个总体偏移。。
    particle.position = position.add(offsetPVector);

    Object.assign(particle, { acceleration });

    particleSystem.emit(particle);
  }
  return particleSystem;
}

function play(draw: Function): void {  
  const MAX_TIME = 3000;
  let fps = 30,
      now,
      then = Date.now(),
      interval = 1000/fps,
      delta,
      total = 0;
  function tick() {
    if(total > MAX_TIME) return;
    requestAnimationFrame(tick);
    now = Date.now();
    delta = now - then;
    if(delta > interval) {
      // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
      then = now - (delta % interval);
      draw(); // ... Code for Drawing the Frame ...
    }
    total += interval;
  }
  tick();
}

async function go() {
  const particleSystem = await initSystem();
  play(() => {
    particleSystem.run();
  });
}
go();
