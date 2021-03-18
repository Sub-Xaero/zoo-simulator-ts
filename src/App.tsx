import {faClock, faPizzaSlice} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {ActionButton} from "./ActionButton";
import {Animal} from "./Animal";
import "./App.css";
import {FoodContext, useFood} from "./Food";
import {Elephant} from "./models/Elephant";
import {Giraffe} from "./models/Giraffe";
import {Monkey} from "./models/Monkey";

function App() {
  let [time, setTime] = useState(1);
  let [food, setFood] = useFood(0);

  let [animals, setAnimals] = useState([
    new Monkey(),
    new Giraffe(),
    new Elephant(),
  ]);

  let timeSuffix = (): string => time < 12 ? "am" : "pm";
  let allAnimalsDead = (): boolean => animals.every((animal) => animal.dead);

  let tick = () => {
    setTime((prevTime) => prevTime === 23 ? 0 : prevTime + 1);
    setAnimals((prevState) =>
      prevState.map((animal) => {
          if (animal.dead) {
            return animal;
          }
          let damage = Math.floor(Math.random() * 20);
          animal.health = Math.max(0, animal.health - damage);

          if (animal.willDie()) {
            animal.dead = true;
          } else if (animal.canSurviveInjury() && animal.willBeInjured()) {
            animal.injured = true;
          } else {
          }
          return animal;
        },
      ),
    );
  };

  let feed = () => {
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
