import { PVector2 } from './pvector2';
import { Color } from 'discretizate';
export declare class Particle {
    position: PVector2;
    size: PVector2;
    acceleration: PVector2;
    velocity: PVector2;
    age: number;
    isDead: boolean;
    color: Color;
    constructor(position: PVector2, size: PVector2, acceleration?: PVector2, velocity?: PVector2);
}
