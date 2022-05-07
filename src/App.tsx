import React, { useEffect, useRef } from "react";
import "./App.css";
import * as d3 from "d3";
import { data } from "./mock/data";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (canvasRef.current) {
      console.log(canvasRef.current);
      // 正常但不显示1
      // d3.select(".d3-canvas")
      //   .data(data)
      //   .enter()
      //   .append("p")
      //   .text((val) => val);
      // 报错
      d3.select(canvasRef.current)
        .data(data)
        .enter()
        .append("p")
        .text((val) => val);
    }
  }, []);

  return (
    <div className="App">
      <div
        ref={(ref) => {
          if (ref) {
            canvasRef.current = ref;
          }
        }}
        className="d3-canvas"
      ></div>
    </div>
  );
}

export default App;
