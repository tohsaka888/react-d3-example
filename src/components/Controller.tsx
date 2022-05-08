import React, { useContext, useState } from "react";
import { NewPointContext } from "../Context/NewPointContext";
import { PointInfoContext } from "../Context/PointInfoContext";

function Controller() {
  const [tempX, setTempX] = useState<number>(0);
  const [tempY, setTempY] = useState<number>(0);
  const [tempInfo, setTempInfo] = useState<string>("");
  const props = useContext(NewPointContext);
  const setInfo = useContext(PointInfoContext)?.setInfo;
  return (
    <div
      style={{
        textAlign: "left",
        height: "5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div>
        x:
        <input type="text" onChange={(e) => setTempX(+e.target.value)} />
      </div>
      <div>
        y:
        <input type="text" onChange={(e) => setTempY(+e.target.value)} />
      </div>
      <div>
        point-info:
        <input type="text" onChange={(e) => setTempInfo(e.target.value)} />
      </div>
      <button
        onClick={() => {
          props?.setX(tempX);
          props?.setY(tempY);
          if (setInfo) {
            setInfo(tempInfo);
          }
        }}
      >
        add
      </button>
    </div>
  );
}

export default Controller;
