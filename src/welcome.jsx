import React from "react";
import vid from "../public/videos/welcome-schedule-app.mp4"

export default function Welcome() {
  return (
    
      <video autoPlay loop muted>
        <source src={vid} type="video/mp4" />
        NO
      </video>
    
  );
}
