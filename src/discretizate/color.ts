
export class Color {
  readonly a: number;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
    alpha: number = 0
  ) {
    // alpha可能是255，做下处理
    if(alpha < 0) {
      alpha = 0;
    } else if(alpha > 1) {
      alpha = alpha / 255;
    }
    this.a = alpha;
  }
}
