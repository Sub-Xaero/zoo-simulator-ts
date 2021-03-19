// Abstract Base Class
// This model and all sub-classes use polymorphism, to easily share common properties between the sub-classes of animal and provide a common interface for the rendering logic.
export abstract class Animal {

  health: number = 100;
  dead: boolean = false;
  injured: boolean = false;

  abstract get image(): any;

  abstract get name(): string;

  abstract get injuryThreshold(): number;

  abstract canSurviveInjury(): boolean;

  abstract willDie(): boolean;

  willBeInjured(): boolean {
    return this.health < this.injuryThreshold;
  }
}
