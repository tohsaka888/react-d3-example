import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import Controller from "./components/Controller";
import { NewPointContext } from "./Context/NewPointContext";
import {
  ContainerContext,
} from "./Context/ContainerContext";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
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
        .attr("r", 40)
        .attr("cx", x)
        .attr("cy", y);
    }
  }, [x, y]);
  return (
    <ContainerContext.Provider value={{ containerRef }}>
      <NewPointContext.Provider value={{ x, y, setX, setY }}>
        <div className="App">
          <Controller />
          <div
            ref={(ref) => {
              if (ref) {
                canvasRef.current = ref;
              }
            }}
            className="d3-canvas"
            style={{
              width: window.innerWidth * 0.8,
              height: window.innerHeight * 0.8,
              marginTop: "30px",
            }}
          />
        </div>
      </NewPointContext.Provider>
    </ContainerContext.Provider>
  );
}

export default App;
