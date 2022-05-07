import { createContext, Dispatch, SetStateAction } from "react";

type NewPointContextProp = {
  x: number;
  y: number;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
};

export const NewPointContext = createContext<NewPointContextProp | null>(null);
