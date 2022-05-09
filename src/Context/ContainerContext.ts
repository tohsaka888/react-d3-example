import { createContext, MutableRefObject } from "react";
import { D3CANVAS } from "../d3_components/type";

export type ContainerContextProp = {
  containerRef: MutableRefObject<D3CANVAS>;
};

export const ContainerContext = createContext<ContainerContextProp | null>(
  null
);
