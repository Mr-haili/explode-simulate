
function numTrim(x: number): number {
  return Number(x.toPrecision(3))
}

/**
 * 二维空间上的向量
 */
export class PVector2 {
  constructor(
    readonly x: number,
    readonly y: number
  ) { }

  static readonly zero = new PVector2(0, 0);

  clone(): PVector2 {
    return new PVector2(this.x, this.y);
  }

  equal(p: PVector2): boolean {
    let { x, y } = this;
    return numTrim(x) === numTrim(p.x) && numTrim(y) === numTrim(p.y);
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
    return new PVector2(this.x * f, this.y * f);
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

  normalize(): PVector2 {
    const { x, y } = this;
    const len = this.len();
    if(0 === len) return this; // 0向量返回自身
    return new PVector2(x / len, y / len);
  }

  // 向量长度
  len(): number {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  zero(): PVector2 {
    return PVector2.zero;
  }

  isZero(): boolean {
    const { x, y } = this;
    return x === 0 && y === 0;
  }

  toArray(): [number, number] {
    return [this.x, this.y];
  }
}
