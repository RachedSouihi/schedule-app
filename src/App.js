import React from "react";
import Event from "./Event";
//import {nanoid} from 'nanoid'
//import axios from 'axios'
import "./index.css";
import data from "./data.js";

export default function App() {
  //const [showWelcApp, setShowWelcApp] = React.useState(false)
  //const [hambClicked, setHambClicked] = React.useState(false);
  //const [showEvent, setShowEvent] = React.useState(false);
  /*const [showMeeting, setShowMeeting] = React.useState(false);
  const [showAppointment, setShowAppointment] = React.useState(false);
  const [optIndex, setOptIndex] = React.useState(-1)
  
  console.log(showEvent, showMeeting, showAppointment);*/
  function compareDate(d1, d2) {
    return d1 - d2;
  }
  /*function Change(Fn, Fn1, Fn2, index) {
    Fn(true);
    Fn1(false);
    Fn2(false);
    setOptIndex(index)
    //alert(showEvent)
    const l = document.getElementsByTagName("li");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor = i === index ? "rgba(0, 0, 0, .5)" : "transparent";
      l[i].style.transition = "0.25s ease";
    }
  }
  const optMouseOver = (index) => {
    const l = document.getElementsByTagName('li')
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor = i === index && i !== optIndex ? "rgba(0, 0, 0, .2)" : i === optIndex ? 'rgba(0, 0, 0, .5)' : "transparent";
      l[i].style.transition = "0.25s ease";
    }
  }
 
  
  const [nbreRender, setNbreRender] = React.useState(0)
  React.useEffect(() => {
    const nav = document.getElementById("nav");
    const logo = document.getElementById("hamblogo");

    logo.classList.toggle("rotateLogo");
    nav.style.width = hambClicked ? "250px" : "0";
  }, [hambClicked]);
  let tabListElem = [
    {
      type: "Event",
      Fn: setShowEvent,
      Fn1: setShowMeeting,
      Fn2: setShowAppointment,
    },
    {
      type: "Meeting",
      Fn: setShowMeeting,
      Fn1: setShowEvent,
      Fn2: setShowAppointment,
    },
    {
      type: "Appointment",
      Fn: setShowAppointment,
      Fn1: setShowEvent,
      Fn2: setShowMeeting,
    },
  ];
  React.useEffect(() => {}, []);
  tabListElem = tabListElem.map((prevElem, index) => (
    <li
    key={nanoid()}
      onClick={() =>
        Change(prevElem.Fn, prevElem.Fn1, prevElem.Fn2, index)
    
      onMouseOver={() => optMouseOver(index)}
    >
      {prevElem.type}
    </li>
  ));
  */

  return <Event data={data} compareDate={compareDate} />;
}
//      <HambList tabListElem = {tabListElem} setHambClicked={setHambClicked} onClick = {() => setHambClicked(prev => !prev)} />
