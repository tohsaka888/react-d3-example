import * as d3 from "d3";
import React from "react";
import { drawLine } from "./line";
import { D3CANVAS } from "./type";

const createPoint = (
  container: D3CANVAS,
  x: number,
  y: number,
  pointId: number,
  rightEventClick: (e: React.MouseEvent) => void,
  dragEvent: (e: any, pointId: string) => void
): d3.Selection<SVGGElement, unknown, null, undefined> | undefined => {
  let pointContainer = container
    ?.append("g")
    .attr("id", "point" + pointId)
    .on("mouseover", function () {
      d3.select(this)
        .select("circle")
        .transition()
        .duration(500)
        .attr("fill", "red")
        .attr("filter", `drop-shadow(0px 0px 10px yellow)`);
    })
    .on("mouseout", function () {
      d3.select(this)
        .select("circle")
        .transition()
        .duration(500)
        .attr("fill", "pink")
        .attr("filter", `drop-shadow(0px 0px 10px transparent)`);
    })
    .on("mousedown", rightEventClick)
    .call(
      d3
        .drag<SVGGElement, unknown>()
        .on("start", function (event, d: any) {
          d3.select(this).select("circle").attr("stroke", "black");
          drawLine(container, { x: x, y: y, pointId: "point" + pointId });
        })
        .on("drag", function (event, d) {
          d3.select(this)
            .select("circle")
            .attr("cx", event.x)
            .attr("cy", event.y);
          dragEvent(event, d3.select(this).attr('id'))
          d3.select(this).select("text").attr("x", event.x).attr("y", event.y);
        })
        .on("end", function dragended(event, d) {
          d3.select(this).select("circle").attr("stroke", "red");
        })
    );
  pointContainer
    ?.append("circle")
    .attr("r", 30)
    .attr("cx", x)
    .attr("cy", y)
    .attr("fill", "pink")
    .attr("stroke", "red")
    .style("cursor", "pointer");
  return pointContainer;
};

const createPointInfo = (
  pointContainer:
    | d3.Selection<SVGGElement, unknown, null, undefined>
    | undefined,
  x: number,
  y: number,
  info: string
) => {
  if (pointContainer) {
    d3.selectAll(pointContainer)
      .append("text")
      .attr("x", x)
      .attr("y", y)
      .attr("text-anchor", "middle") // 水平居中
      .attr("alignment-baseline", "central") // 垂直居中
      .style("cursor", "pointer")
      .text(info);
  }
};

export { createPoint, createPointInfo };
