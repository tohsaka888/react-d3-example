import { D3CANVAS } from "./type";
import * as d3 from 'd3'

const createCanvas = (canvasElement: HTMLDivElement, canvasDragEvent: (event: any, d: any) => void): D3CANVAS => {
  const d3_canvas = d3
    .select(canvasElement)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(d3.drag<SVGSVGElement, unknown>()
      .on('start', function (event, d) {
        d3.select(this).style('cursor', 'grabbing');
      })
      .on('drag', canvasDragEvent))
  return d3_canvas?.append('g').attr('transform', `translate(0, 0)`)
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