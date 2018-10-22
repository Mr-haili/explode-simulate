import {
  Particle,
  PVector2
} from './';
import {
  ParticleRecord
} from './types';

// 记录particle与对应sprite的映射关系
export class ParticleRender {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(
    selector: string
  ) {
    // const canvas = document.createElement('canvas');
    const canvas = (document.getElementById('myCanvas') as HTMLCanvasElement);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this._canvas = canvas;
    this._ctx = ctx;
  }

  draw(particles: ReadonlyArray<Readonly<Particle>>) {
    const render = this;
    const { _ctx: ctx, _canvas: canvas } = render;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let particle of particles) {
      const {
        position: { x, y },
        size,
        color
      } = particle;

      // 1. 获取并粒子正确位置
      // 2. 更新粒子寿命
      // 3. 根据寿命，计算一个percent
      // 4. 根据percent更新粒子对应的尺寸和，透明度，然后渲染
      // const percent = ; TODO

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      ctx.fillRect(x, y, ...size.toArray());

      // let currSize = this.startSize * this.sizeFunc(percent);
      // let currOpacity = this.opacityFunc(percent);
      // ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ',' + currOpacity + ")";
    }
  }
}
