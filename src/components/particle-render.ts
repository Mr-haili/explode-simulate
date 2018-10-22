import {
  Particle,
  PVector2
} from './';
import {
  Scene,
  Sprite
} from 'spritejs';
import {
  ParticleRecord
} from './types';

// 记录particle与对应sprite的映射关系
export class ParticleRender {
  private _scene: any;
  private _layer: any;

  constructor(
    selector: string
  ) {
    const scene = new Scene(selector, {
      viewport: ['auto', 'auto'],
      resolution: [3000, 3000], // TODO 这里写死了
      // autoRender:false
    });

    this._scene = scene;
    this._layer = scene.layer();
  }

  // 获取新的精灵
  private createNewSprite(particle: Particle): Sprite {
    const { position: { x, y } } = particle;
    const sprite = new Sprite();
    sprite.attr({
      anchor: [0.5, 0.5],
      size: [100, 100],
      pos: [x, y],
      bgcolor: 'blue',
      borderRadius: 60
    });
    this._layer.append(sprite);
    return sprite;
  }

  draw(records: ReadonlyArray<ParticleRecord>) {
    const render = this;

    for(let record of records) {
      let { particle, sprite } = record;
      if(!sprite) {
        sprite = this.createNewSprite(particle);
        record.sprite = sprite;
      }

      const {
        position: { x, y }
      } = particle;

      // 1. 获取并粒子正确位置
      // 2. 更新粒子寿命
      // 3. 根据寿命，计算一个percent
      // 4. 根据percent更新粒子对应的尺寸和，透明度，然后渲染
      // const percent = ; TODO
      sprite.attr({
        pos: [x, y]
      });

      // let currSize = this.startSize * this.sizeFunc(percent);
      // let currOpacity = this.opacityFunc(percent);
      // ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ',' + currOpacity + ")";
    }
  }
}
