import {
  Particle,
  PVector2,
  ParticleSystem
} from 'particle-system';
import {
  Color
} from './color';

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
  const { data, width: imgWidth, height: imgHeight } = await getImageData(imageSrc);
  const [unitWidth, unitHeight] = [imgWidth / unit, imgHeight / unit];
  const size = new PVector2(unitWidth, unitHeight);

  let particles: Particle[] = [], particle: Particle,
    x: number, y: number,
    rgbaArray: [number, number, number, number],
    color: Color, pixIdx: number;
  for(let row = 0; row < unit; row++) {
    for(let col = 0; col < unit; col++) {
      particle = new Particle(new PVector2(row * unitWidth, col * unitHeight), size);
      pixIdx = ((row * unit * unitWidth) + col * unitHeight) * 4; // rgba占四位
      rgbaArray = Array.from(data.slice(pixIdx, pixIdx + 4)) as any;
      particle.color = new Color(...rgbaArray);
      particles.push(particle);
    }
  }
  return { particles, width: imgWidth, height: imgHeight };
}
