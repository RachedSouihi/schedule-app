import React from "react";
import Event from "./Event";
import Welcome from "./components/welcome";
//import {nanoid} from 'nanoid'
//import axios from 'axios'
import "./index.css";
import data from "./data.js";

export default function App() {
  const [showWelcome, setShowWelcome] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 2350);
  }, []);
  function compareDate(d1, d2) {
    return d1 - d2;
  }

  return <div>{showWelcome ? <Welcome /> : <Event data={data} compareDate={compareDate}/>}</div>;
}
