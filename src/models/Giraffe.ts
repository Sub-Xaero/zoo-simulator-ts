import giraffeImage from "../images/giraffe.png";
import {Animal} from "./Animal";

export class Giraffe extends Animal {

  get name(): string {
    return "Giraffe";
  }

  get injuryThreshold() {
    return 50;
  }

  get image() {
    return giraffeImage;
  }

  canSurviveInjury(): boolean {
    return false;
  }

  willDie(): boolean {
    return this.willBeInjured();
  }

}
