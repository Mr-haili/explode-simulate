/**
 * 二维空间上的向量
 */
export class PVector2 {
  constructor(
    readonly x: number,
    readonly y: number
  ) { }

  clone(): PVector2 {
    return new PVector2(this.x, this.y);
  }

  add(p: PVector2): PVector2 {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = p;
    return new PVector2(x1 + x2, y1 + y2);
  }

  subtract(p: PVector2): PVector2 {
    return new PVector2(this.x - p.x, this.y - p.y);
  }

  multiply(f: number): PVector2 {
    return new PVector2(this.x * f, this.x * f);
  }

  divide(f: number): PVector2 {
    var invf = 1 / f;
    return new PVector2(this.x * invf, this.y * invf);
  }

  dot(p: PVector2) {
    return this.x * p.x + this.y * p.y;
  }

  negate(): PVector2 {
    return new PVector2(-this.x, -this.y);
  }
}
