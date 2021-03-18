import React, {useEffect, useState} from "react";

export function useFood(initialState: number): [number, React.Dispatch<React.SetStateAction<number>>] {
  let [food, setFood] = useState(initialState);

  useEffect(() => {
    let foodExpiryTimout = setInterval(() => {
      setFood((prevFood) => Math.max(0, prevFood - 1));
    }, 1500);

    return () => {
      clearTimeout(foodExpiryTimout);
    };
  });

  return [food, setFood];
}

export const FoodContext = React.createContext(0);
