import React, { useContext, useState } from "react";
import { NewPointContext } from "../Context/NewPointContext";

function Controller() {
  const [tempX, setTempX] = useState<number>(0);
  const [tempY, setTempY] = useState<number>(0);
  const props = useContext(NewPointContext);
  return (
    <div style={{ textAlign: "left" }}>
      x:
      <input type="text" onChange={(e) => setTempX(+e.target.value)} />
      y:
      <input type="text" onChange={(e) => setTempY(+e.target.value)} />
      <button
        onClick={() => {
          props?.setX(tempX);
          props?.setY(tempY);
        }}
      >
        add
      </button>
    </div>
  );
}

export default Controller;
