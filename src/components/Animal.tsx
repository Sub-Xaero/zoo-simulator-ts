import {faBandAid, faHeart, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {FoodContext} from "../Food";
import hamburger from "../images/hamburger.png";
import "./Animal.css";

interface AppProps {
  image: any;
  name: string;
  health: number;
  injured: boolean;
  dead: boolean;
}

export function Animal(props: AppProps) {
  return (
    <div className={"text-center p-4 flex rounded text-black animal-wrapper  " + (props.dead ? " dead " : (props.injured ? " injured " : " alive "))}>
      <div className={"jungle rounded flex-grow"}>
        <img src={props.image} className={"animal h-32 mx-auto"} alt={props.name + " Image"}/>
        <div className={"flex h-10 justify-start items-center rounded shadow-inner bg-gray-100 mx-2 mb-2"}>
          {!props.dead &&
          <FoodContext.Consumer>
            {(food) => Array(food).fill(food).map((x, index) => <img alt={""} className={"food h-6"} key={index} src={hamburger}/>)}
          </FoodContext.Consumer>
          }
        </div>
      </div>
      <div className="stats ml-2 flex flex-col justify-evenly">
        <p className={"text-lg my-1  border-b border-gray-200"}>{props.name}</p>
        <div className="grid grid-cols-1 gap-4 text-lg mt-2">
          <div className={"bg-gray-200 text-gray-700 p-1 rounded shadow-inner"}>
            {props.health}/100

          </div>
          <div className={"bg-gray-200 text-gray-700 p-1 rounded shadow-inner"}>
            {!props.dead && !props.injured && <>Healthy <FontAwesomeIcon icon={faHeart} className={"ml-1 text-red-500"}/></>}
            {!props.dead && props.injured && <>Injured <FontAwesomeIcon icon={faBandAid} className={"ml-1 text-red-500"}/></>}
            {props.dead && <>Dead <FontAwesomeIcon icon={faSkullCrossbones} className={"ml-1 text-red-500"}/></>}
          </div>

        </div>
      </div>
    </div>
  );
}
