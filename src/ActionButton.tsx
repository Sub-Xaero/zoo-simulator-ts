import React from "react";

interface ButtonProps {
  children: any;
  onClick: () => any;
}

export function ActionButton(props: ButtonProps) {

  return <>
    <button className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500  hover:bg-purple-600" onClick={props.onClick}>
      {props.children}
    </button>
  </>

}
