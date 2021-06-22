import { Particle } from 'particle-system';
/**
 * 获取一个图片的像素数据
 */
export declare function getImageData(imageSrc: string): Promise<ImageData>;
/**
 * 暂时是平台相关的
 * 我们利用cancas api将一个图片粒子化，
 * 获取到的particles组成图像尺寸1:1原图像
 *
 * @param imageSrc 图片的地址
 * @param unit 将图片分割的成unit个基础单位
 */
export declare function imageDiscretizate(imageSrc: string, unit?: number): Promise<{
    particles: Particle[];
    width: number;
    height: number;
}>;
