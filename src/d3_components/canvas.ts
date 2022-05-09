import { D3CANVAS } from "./type";
import * as d3 from 'd3'

const createCanvas = (canvasElement: HTMLDivElement): D3CANVAS => {
  return d3
    .select(canvasElement)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");
}

const createBackground = (container: D3CANVAS) => {
  if (container) {
    return container
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "transparent")
      .attr("stroke", "red");
  }
}

export { createCanvas, createBackground }