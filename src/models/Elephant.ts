import elephantImage from "../images/elephant.png";
import {Animal} from "./Animal";

export class Elephant extends Animal {

  get name(): string {
    return "Elephant";
  }

  get injuryThreshold() {
    return 70;
  }

  get image() {
    return elephantImage;
  }

  canSurviveInjury() {
    return true;
  }

  willDie(): boolean {
    return this.willBeInjured() && this.injured;
  }
}
