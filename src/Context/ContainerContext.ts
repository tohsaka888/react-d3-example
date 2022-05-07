import { createContext, MutableRefObject } from "react";
import * as d3 from "d3";

export type ContainerContextProp = {
  containerRef: MutableRefObject<
    d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined
  >;
};

export const ContainerContext = createContext<ContainerContextProp | null>(
  null
);
