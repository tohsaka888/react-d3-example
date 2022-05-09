import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import Controller from "./components/Controller";
import { NewPointContext } from "./Context/NewPointContext";
import { ContainerContext } from "./Context/ContainerContext";
import { PointInfoContext } from "./Context/PointInfoContext";
import { createPoint, createPointInfo } from "./d3_components/point";
import { createCanvas } from "./d3_components/canvas";
import RightClickMenu from "./components/RightClickMenu";
import { D3CANVAS } from "./d3_components/type";

function App() {
  const canvasRef = useRef<HTMLDivElement>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const [rightMenuX, setRightMenuX] = useState<number>(0);
  const [rightMenuY, setRightMenuY] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const containerRef = useRef<D3CANVAS>();
  const pointerContainerRef = useRef<
    d3.Selection<SVGGElement, unknown, null, undefined> | undefined
  >();

  const rightClickEvent = useCallback((e: React.MouseEvent) => {
    if (e.button === 2) {
      document.oncontextmenu = () => {
        return false;
      };
      e.preventDefault();
      setRightMenuX(e.clientX);
      setRightMenuY(e.clientY);
      setShow(true);
    }
  }, []);

  const canvasDragEvent = useCallback((e: any, d: any) => {
    const tempArr = containerRef.current?.attr("transform").split(",");
    const x = +(tempArr?.[0]?.split("(")[1] || 0);
    const y = +(tempArr?.[1]?.split(")")[0] || 0);
    containerRef.current?.attr(
      "transform",
      `translate(${x + e.dx}, ${y + e.dy})`
    );
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
      // createBackground(containerRef.current);
    }
  }, [canvasDragEvent]);
  useEffect(() => {
    if (x && y) {
      pointerContainerRef.current = createPoint(
        containerRef.current,
        x,
        y,
        rightClickEvent
      );
      createPointInfo(pointerContainerRef.current, x, y, info);
    }
  }, [info, rightClickEvent, x, y]);

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
                border: "1px solid red",
              }}
            />
          </div>
          <RightClickMenu
            rightMenuX={rightMenuX}
            rightMenuY={rightMenuY}
            show={show}
            setShow={setShow}
          />
        </PointInfoContext.Provider>
      </NewPointContext.Provider>
    </ContainerContext.Provider>
  );
}

export default App;
