import * as _ from './utils';
import { PVector2 } from './pvector2';

export class Particle {
  age: number;
  isDead: boolean;

  constructor(
    public position: PVector2,
    public size: PVector2,
    public acceleration: PVector2,
    public velocity: PVector2
  ) {
    this.age = 0;
    this.isDead = false;
  }
}
