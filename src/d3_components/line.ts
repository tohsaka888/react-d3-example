import { D3CANVAS, MOVEPOINT } from "./type";
import * as d3 from 'd3'

const drawLine = (container: D3CANVAS, movePoint: MOVEPOINT) => {
  if (d3.selectAll('#line-' + movePoint.pointId).size() === 0 && container) {
    container
      ?.insert("path", ':first-child')
      .attr("d", `M ${movePoint.x} ${movePoint.y} L 0 0`)
      .attr("stroke", "blue")
      .attr("id", `line-${movePoint.pointId}`)
  }
}

export { drawLine }