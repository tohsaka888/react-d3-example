import React, { useEffect, useRef } from "react";
import "./App.css";
import * as d3 from "d3";
import { data } from "./mock/data";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (canvasRef.current) {
      console.log(canvasRef.current)
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
      ></div>
    </div>
  );
}

export default App;
