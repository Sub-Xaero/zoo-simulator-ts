import {faBandAid, faHeart, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

interface AppProps {
  image: any;
  name: string;
  health: number;
  injured: boolean;
  dead: boolean;
}

export function Animal(props: AppProps) {
  return (
    <div className={"text-center  p-4  rounded text-black " + (props.dead ? " dead " : (props.injured ? " injured " : " alive "))}>
      <img src={props.image} className={"h-32 mx-auto"} alt={props.name + " Image"}/>
      <p className={"text-sm my-1"}>{props.name}</p>
      <hr/>
      <div className="grid grid-cols-1 gap-4 text-lg mt-2">
        <div className={"bg-gray-200 text-gray-700 p-1 rounded shadow-inner"}>
          {props.health}/100

        </div>
        <div className={"bg-gray-200 text-gray-700 p-1 rounded shadow-inner"}>
          { !props.dead && !props.injured && <>Healthy <FontAwesomeIcon icon={faHeart} className={"ml-1 text-red-500"}/></>}
          { !props.dead && props.injured && <>Injured <FontAwesomeIcon icon={faBandAid} className={"ml-1 text-red-500"}/></>}
          { props.dead && <>Dead <FontAwesomeIcon icon={faSkullCrossbones} className={"ml-1 text-red-500"}/></>}
        </div>

      </div>
    </div>
  );
}
