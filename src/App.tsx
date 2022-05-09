import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import Controller from "./components/Controller";
import { NewPointContext } from "./Context/NewPointContext";
import { ContainerContext } from "./Context/ContainerContext";
import { PointInfoContext } from "./Context/PointInfoContext";
import { createPoint, createPointInfo } from "./d3_components/point";
import { createBackground, createCanvas } from "./d3_components/canvas";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const containerRef =
    useRef<d3.Selection<SVGSVGElement, unknown, null, undefined>>();
  const pointerContainerRef = useRef<
    d3.Selection<SVGGElement, unknown, null, undefined> | undefined
  >();
  useEffect(() => {
    if (canvasRef.current) {
      // 需要先取出所有子元素比对
      containerRef.current = createCanvas(canvasRef.current);
      createBackground(containerRef.current);
    }
  }, []);
  useEffect(() => {
    if (x && y) {
      pointerContainerRef.current = createPoint(containerRef.current, x, y);
      createPointInfo(pointerContainerRef.current ,x, y, info);
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
