import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import Controller from "./components/Controller";
import { NewPointContext } from "./Context/NewPointContext";
import { ContainerContext } from "./Context/ContainerContext";
import { PointInfoContext } from "./Context/PointInfoContext";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const containerRef =
    useRef<d3.Selection<SVGSVGElement, unknown, null, undefined>>();
  useEffect(() => {
    if (canvasRef.current) {
      // 需要先取出所有子元素比对
      containerRef.current = d3
        .select(canvasRef.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");
      containerRef.current
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "transparent")
        .attr("stroke", "red");
    }
  }, []);
  useEffect(() => {
    if (x && y) {
      containerRef.current
        ?.append("circle")
        .style("z-index", "1")
        .attr("r", 30)
        .attr("cx", x)
        .attr("cy", y)
        .attr("fill", "transparent")
        .attr("stroke", "red")
        .append("text")
        .style("z-index", "2")
        .text(info);
      d3.selectAll("svg")
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .text(info);
    }
  }, [info, x, y]);
  return (
    <ContainerContext.Provider value={{ containerRef }}>
      <NewPointContext.Provider value={{ x, y, setX, setY }}>
        <PointInfoContext.Provider value={{ info, setInfo }}>
          <div className="App">
            <Controller />
            <div
              ref={(ref) => {
                if (ref) {
                  canvasRef.current = ref;
                }
              }}
              style={{
                width: "100vw",
                height: "90vh",
              }}
            />
          </div>
        </PointInfoContext.Provider>
      </NewPointContext.Provider>
    </ContainerContext.Provider>
  );
}

export default App;
