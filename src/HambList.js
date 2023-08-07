import React from "react";
//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

export default function HambList(props) {
  const style = {
   
  }
  return (
    <div style={style}>
      <div className="hamburger" id="hamburger">
        <img

          src="hamblogo.png"
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
