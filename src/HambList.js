import React from "react";

export default function HambList(props) {
  const style = {
   
  }
  return (
    <div style={style}>
      <div className="hamburger" id="hamburger">
        <img

          src="./hamblogo.png"
          width="60px"
          height="60px"
          alt="not found"
          id="hamblogo"
          onClick={() => props.setHambClicked((prev) => !prev)}
        />
      </div>

      <nav className="nav" id="nav">
        <ul>{props.tabListElem}</ul>
      </nav>
    </div>
  );
}
