import { createContext, Dispatch, SetStateAction } from "react";

type PointInfoContextProp = {
  info: string;
  setInfo: Dispatch<SetStateAction<string>>;
};

export const PointInfoContext = createContext<PointInfoContextProp | null>(
  null
);
