import * as d3 from 'd3'
import { D3CANVAS } from './type'

const createPoint = (container: D3CANVAS, x: number, y: number): d3.Selection<SVGGElement, unknown, null, undefined> | undefined => {
  let pointContainer = container
    ?.append('g')
    .on('mouseover', function () {
      d3.select(this).select('circle').transition().duration(500).attr("fill", "red").attr('filter', `drop-shadow(0px 0px 10px yellow)`)
      console.log(111)
    })
    .on('mouseout', function () {
      d3.select(this).select('circle').transition().duration(500).attr("fill", "transparent")
      console.log(222)
    })
  pointContainer?.append("circle")
    .attr("r", 30)
    .attr("cx", x)
    .attr("cy", y)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .style("cursor", "pointer")
  return pointContainer
  // .call(d3.drag())
}

const createPointInfo = (pointContainer: d3.Selection<SVGGElement, unknown, null, undefined> | undefined, x: number, y: number, info: string) => {
  if (pointContainer) {
    d3.selectAll(pointContainer)
      .append("text")
      .attr("x", x)
      .attr("y", y)
      .attr("text-anchor", "middle")  // 水平居中
      .attr("alignment-baseline", "central")  // 垂直居中
      .style("cursor", "pointer")
      .text(info);
  }
}

export { createPoint, createPointInfo }