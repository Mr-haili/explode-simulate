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
      resolution: [1000, 1000], // TODO 这里写死了
      autoRender: false
    });

    this._scene = scene;
    this._layer = scene.layer();
    this._needAppendRecords = [];
  }

  private _needAppendRecords: ParticleRecord[];

  // 获取新的精灵
  private createNewSprite(particle: Particle): Sprite {
    const { position, size, color } = particle;
    const sprite = new Sprite();
    sprite.attr({
      anchor: [0.5, 0.5],
      size: size.toArray(),
      pos: position.toArray(),
      bgcolor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    });
    return sprite;
  }

  draw(records: ReadonlyArray<ParticleRecord>) {
    const render = this;

    console.log('-----开始更新精灵状态------');
    for(let record of records) {
      let { particle, sprite } = record;
      if(!sprite) {
        sprite = this.createNewSprite(particle);
        record.sprite = sprite;
        this._needAppendRecords.push(record);
      }

      const {
        position
      } = particle;

      // 1. 获取并粒子正确位置
      // 2. 更新粒子寿命
      // 3. 根据寿命，计算一个percent
      // 4. 根据percent更新粒子对应的尺寸和，透明度，然后渲染
      // const percent = ; TODO
      sprite.attr({
        pos: position.toArray()
      });

      // let currSize = this.startSize * this.sizeFunc(percent);
      // let currOpacity = this.opacityFunc(percent);
      // ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ',' + currOpacity + ")";
    }
    console.log('------结束更新精灵状态------');

    // 挂载
    console.log('------开始挂载-------------');
    render._layer.append(...this._needAppendRecords.map(record => record.sprite));
    this._needAppendRecords = [];
    console.log('------结束挂载-------------');

    console.log('------开始绘制------');
    render._layer.draw();
    console.log('------结束绘制------');
  }
}
