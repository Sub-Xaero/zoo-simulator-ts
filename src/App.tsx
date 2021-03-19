import {faClock, faPizzaSlice} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import "./App.css";
import {ActionButton} from "./components/ActionButton";
import {Animal} from "./components/Animal";
import {FoodContext, useFood} from "./Food";
import {Elephant} from "./models/Elephant";
import {Giraffe} from "./models/Giraffe";
import {Monkey} from "./models/Monkey";

function App() {
  // Local State
  let [time, setTime] = useState(1);
  let [food, setFood] = useFood(0);

  let [animals, setAnimals] = useState([
    new Monkey(),
    new Giraffe(),
    new Elephant(),
  ]);

  // Computed State
  let timeSuffix = (): string => time < 12 ? "am" : "pm";
  let allAnimalsDead = (): boolean => animals.every((animal) => animal.dead);

  // Logic
  // TODO: Should ideally be an action on a Redux store, to lift the logic out of the component.
  let tick = (event?: MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    setTime((prevTime) => prevTime === 23 ? 0 : prevTime + 1);
    setAnimals(
      animals.map((animal) => {
          if (animal.dead) {
            return animal;
          }
          let damage = Math.floor(Math.random() * 20);
          animal.health = Math.max(0, animal.health - damage);

          if (animal.willDie()) {
            animal.dead = true;
          } else if (animal.canSurviveInjury() && animal.willBeInjured()) {
            animal.injured = true;
          }
          return animal;
        },
      ),
    );
  };

  // TODO: Should ideally be an action on a Redux store, to lift the logic out of the component.
  let feed = (event?: MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (allAnimalsDead()) {
      return;
    }

    setFood((prevFood) => Math.min(5, prevFood + 1));
    setAnimals((prevState) =>
      prevState.map((animal) => {
          if (animal.dead) {
            return animal;
          }
          let healthGain = Math.floor(Math.random() * 20);
          animal.health = Math.min(100, animal.health + healthGain);
          if (animal.injured && !animal.willBeInjured()) {
            animal.injured = false;
          }
          return animal;
        },
      ),
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className={"text-3xl mb-6"}>
          The time is {time}{timeSuffix()}
          <FontAwesomeIcon icon={faClock} className={"ml-2"}/>
        </h1>

        <div className="grid grid-cols-3 gap-3">
          <FoodContext.Provider value={food}>
            {
              animals.map(animal =>
                <Animal
                  key={animal.name}
                  health={animal.health}
                  image={animal.image}
                  name={animal.name}
                  dead={animal.dead}
                  injured={animal.injured}
                />,
              )
            }
          </FoodContext.Provider>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6 w-1/2">
          <ActionButton onClick={feed}> <FontAwesomeIcon icon={faPizzaSlice}/> Feed</ActionButton>
          <ActionButton onClick={tick}> <FontAwesomeIcon icon={faClock}/> Advance Time</ActionButton>
        </div>
      </header>
    </div>
  );
}

export default App;
