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
