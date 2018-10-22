import * as _ from './utils';
import { PVector2 } from './pvector2';
import { Color } from 'discretizate';

const zeroPVector = PVector2.zero;

export class Particle {
  age: number;
  isDead: boolean;
  color: Color

  constructor(
    public position: PVector2,
    public size: PVector2,
    public acceleration: PVector2 = zeroPVector,
    public velocity: PVector2 = zeroPVector
  ) {
    this.age = 0;
    this.isDead = false;
  }

  static zero() {

  }
}
