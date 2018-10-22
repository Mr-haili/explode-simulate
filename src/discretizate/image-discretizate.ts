import {
  Particle,
  PVector2,
  ParticleSystem
} from 'particle-system';
import {
  Color
} from './color';
import * as _ from 'utils';
import { chunk } from 'utils';

// 利用闭包做点肮脏的事情
const canvas = document.createElement('canvas');
const canvasStyle = canvas.style;
Object.assign(canvasStyle, {
  // position: 'absolute',
  // left: '-1000px',
  // top: '-1000px',
  // 'z-index': -1000
});
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

/**
 * 获取一个图片的像素数据
 */
export async function getImageData(imageSrc: string): Promise<ImageData> {
  const image = new Image();
  image.src = imageSrc;

  const promise: Promise<ImageData> =  new Promise((resolve, reject) => {
    image.onload = () => {
      const { width, height } = image;
      ctx.drawImage(image, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height);
      resolve(data);
    }
  });
  return promise;
}

/**
 * 暂时是平台相关的
 * 我们利用cancas api将一个图片粒子化，
 * 获取到的particles组成图像尺寸1:1原图像
 *
 * @param imageSrc 图片的地址
 * @param unit 将图片分割的成unit个基础单位
 */
export async function imageDiscretizate(
  imageSrc: string,
  unit: number = 20
): Promise<{ particles: Particle[], width: number, height: number }> {
  const imageData = await getImageData(imageSrc);
  const { width: imgWidth, height: imgHeight } = imageData;
  const data = Array.from(imageData.data);
  const colors = chunk(data, 4).map(rgbaArray => {
    return new Color(...rgbaArray as [number, number, number, number]);
  });
  const colorMatrix = chunk(colors, imgWidth);
  const [unitWidth, unitHeight] = [imgWidth/unit, imgHeight / unit]
    .map(v => parseInt(v.toString()));
  const size = new PVector2(unitWidth, unitHeight);

  let particles: Particle[] = [], particle: Particle, colorRow;
  for(let row = 0; row < imgHeight; row += unitHeight) {
    colorRow = colorMatrix[row];
    for(let col = 0; col < imgWidth; col += unitWidth) {
      particle = new Particle(new PVector2(col, row), size);
      particle.color = colorRow[col];
      particles.push(particle);
    }
  }
  return { particles, width: imgWidth, height: imgHeight };
}
