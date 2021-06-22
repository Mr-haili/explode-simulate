/**
 * 二维空间上的向量
 */
export declare class PVector2 {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    static readonly zero: PVector2;
    clone(): PVector2;
    equal(p: PVector2): boolean;
    add(p: PVector2): PVector2;
    subtract(p: PVector2): PVector2;
    multiply(f: number): PVector2;
    divide(f: number): PVector2;
    dot(p: PVector2): number;
    negate(): PVector2;
    normalize(): PVector2;
    len(): number;
    zero(): PVector2;
    isZero(): boolean;
    toArray(): [number, number];
}
