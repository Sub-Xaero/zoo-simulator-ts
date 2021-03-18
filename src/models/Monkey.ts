import monkeyImage from "../images/monkey.png";
import {Animal} from "./Animal";

export class Monkey extends Animal {

  get name(): string {
    return "Monkey";
  }

  get image() {
    return monkeyImage;
  }

  get injuryThreshold() {
    return 30;
  }

  canSurviveInjury(): boolean {
    return false;
  }

  willDie(): boolean {
    return this.willBeInjured();
  }

}
