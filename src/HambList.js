import React from "react";
import "./index.css";
export default function HambList(props) {
  const style = {};
  return (
    <div style={style}>
      <div className="hamburger" id="hamburger">
        <div
          id="hamblogo"
          onClick={() => props.setHambClicked((prev) => !prev)}
        >
          X
        </div>
        </div>
      <nav className="nav" id="nav">
        <ul>{props.tabListElem}</ul>
      </nav>
    </div>
  );
}
