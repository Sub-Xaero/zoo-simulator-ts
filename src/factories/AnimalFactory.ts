import {Elephant} from "../models/Elephant";
import {Giraffe} from "../models/Giraffe";
import {Monkey} from "../models/Monkey";

export class AnimalFactory {

  static makeOne(klass: typeof Monkey | typeof Giraffe | typeof Monkey | typeof Elephant): Monkey | Giraffe | Elephant {
    return new klass();
  }

  static makeMany(klass: typeof Monkey |typeof  Giraffe | typeof Elephant, numberOfAnimals: number): Monkey[] | Giraffe[] | Elephant[] {
    let animals = [];
    for (let i = 0; i < numberOfAnimals; i++) {
      animals.push(this.makeOne(klass));
    }
    return animals;
  }

}
