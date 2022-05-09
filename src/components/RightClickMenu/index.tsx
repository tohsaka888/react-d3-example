import React, { SetStateAction, useEffect, useRef } from "react";
import "./index.css";

type Props = {
  rightMenuX?: number;
  rightMenuY?: number;
  show?: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
};

function RightClickMenu({
  rightMenuX = 0,
  rightMenuY = 0,
  show = false,
  setShow,
}: Props) {
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (menuRef.current && e.target !== menuRef.current) {
        document.oncontextmenu = () => {
          return true;
        };
        setShow(false);
      }
    });
  }, [setShow]);
  const menuRef = useRef<HTMLDivElement>();
  return (
    <div className="menu-canvas" style={{ display: show ? "block" : "none" }}>
      <div
        className="right-menu"
        style={{ top: rightMenuY, left: rightMenuX }}
        ref={(ref) => {
          if (ref) {
            menuRef.current = ref;
          }
        }}
      >
        Menu
      </div>
    </div>
  );
}

export default RightClickMenu;
