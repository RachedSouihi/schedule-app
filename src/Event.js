import React from "react";
import { nanoid } from "nanoid";
import "./index.css";

export default function Event(props) {
  const [showEventDesc, setShowEventDesc] = React.useState(false);
  const [showYearList, setShowYearList] = React.useState(false);
  const [showMonthList, setShowMonthList] = React.useState(false);
  const [yearSelectIndex, setYearSelectIndex] = React.useState(0);
  const [monthSelectIndex, setMonthSelectIndex] = React.useState(0);
  const [eventDateIndex, setEventDateIndex] = React.useState(-1);
  const [eventDesc, setEventDesc] = React.useState(<></>);
  const [yearSelected, setYearSelected] = React.useState("");
  const [monthSelected, setMonthSelected] = React.useState("");
  const [date, setDate] = React.useState([]);
  const [eventDate, setEventDate] = React.useState(0);

  const style = {
    display: props.showEvent ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    // border: "1px solid darkred",
    heigth: "100%",
    margin: "150px auto",
    fontFamily: "'Lobster', cursive",
  };
  const eventStyle = {
    // display: showEventDesc ? "none" : "block",
    marginTop: "20px",
  };
  const hStyle = {
    textAlign: "center",
  };

  const clear_event_desc = {
    cursor: "pointer",
    //border: "1px solid gray",
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "1px 1px 2px 2px lightgray",
  };

  React.useEffect(() => {
    let newDate = [];
    for (let i = 0; i < props.data.length; i++) {
      const d = new Date(props.data[i].date);
      const m = d.toLocaleString("default", { month: "long" });
      const y = d.getFullYear();
      //year.push(y);
      if (yearSelected === "" && monthSelected === "") {
        newDate.push(props.data[i].date);
      } else if (yearSelected === "" && monthSelected === m) {
        newDate.push(props.data[i].date);
      } else if (monthSelected === "" && Number(yearSelected) === y) {
        newDate.push(props.data[i].date);
      } else if (
        yearSelected !== "" &&
        monthSelected !== "" &&
        monthSelected === m &&
        Number(yearSelected) === y
      ) {
        newDate.push(props.data[i].date);
      }
    }
    newDate = [...new Set(newDate)];
    newDate.sort((d1, d2) => d1.localeCompare(d2));
    newDate = newDate.map((d) => new Date(d));
    setDate(newDate);
    setEventDate(newDate[0]);
  }, [monthSelected, yearSelected, props.data]);
  let year = props.data.map((e) => new Date(e.date).getFullYear());
  year = [...new Set(year)];
  year = year.sort();
  React.useEffect(() => {
    setEventDateIndex((prev) => prev + 1);
  }, []);
  React.useEffect(() => {
    try {
      const l = document.getElementsByClassName("day");
      for (let i = 0; i < l.length; i++) {
        l[i].style.backgroundColor =
          i === eventDateIndex ? "black" : "transparent";
        l[i].style.color = i === eventDateIndex ? "white" : "black";
        l[i].style.transition = "0.1s ease-in-out";
      }
    } catch (e) {
      console.log(e);
    }
  }, [eventDateIndex]);

  const Change = (d, index) => {
    setEventDate(d);
    setEventDateIndex(index);
  };

  const showEventDescription = (e) => {
    setShowEventDesc(true);

    const eDesc = (
      <div className={`event-desc-style ${"showED"}`}>
        <span
          class="material-icons"
          style={clear_event_desc}
          onClick={() => {
            setShowEventDesc(false);
          }}
        >
          clear
        </span>
        <h2
          style={{ fontFamily: "'Comfortaa', cursive", marginBottom: "10px" }}
        >
          {e.description}
        </h2>
        <span
          style={{ fontFamily: "'Josefin Sans', sans-serif", color: "gray" }}
        >
          You can see all details about {e.title}
        </span>
        <div className="event_desc">
          <div style={{ marginBottom: "15px" }}>
            <div style={{ marginBottom: "5px" }}>
              <span class="material-icons">calendar_month</span>
              <small>Date</small>
            </div>
            <div
              style={{
                fontFamily: "'Comfortaa', cursive",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {e.date}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "5px" }}>
              <span class="material-icons">schedule</span>
              <small>Time</small>
            </div>
            <div
              style={{
                fontFamily: "'Comfortaa', cursive",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {e.start + "-" + e.end}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "5px" }}>
              <span class="material-icons">person_outline</span>
              <small>Host</small>
            </div>
            <div
              style={{
                fontFamily: "'Comfortaa', cursive",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              CEO
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "5px" }}>
              <span class="material-icons">place</span>
              <small>Location</small>
            </div>
            <div
              style={{
                fontFamily: "'Comfortaa', cursive",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {e.location}
            </div>
          </div>
        </div>
      </div>
    );
    setEventDesc(eDesc);
  };
  //alert(yearSelectIndex)
  year.unshift("All year");
  let yearList = year.map((y, index) => (
    <div
      key={nanoid()}
      className="year-value"
      onClick={() => changeYear(y, index)}
      onMouseOver={() => changeBackYear(index)}
      on
    >
      {y}
    </div>
  ));
  //alert(yearSelected)
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months.unshift("All month");
  months = months.map((m, index) => (
    <div key={nanoid()} onClick={() => changeMonth(m, index)} onMouseOver={() => changeBackMonth(index)} className="month-value">
      {m}
    </div>
  ));
  const n = props.data.length;
  let dayList;
  dayList = date.map((d, index) => {
    let DATE =
      d.getDate() + " " + d.toLocaleString("default", { month: "long" }) + " ";
    if (yearSelected === "") DATE += String(d.getFullYear());
    return (
      <span className="day" onClick={() => Change(d, index)}>
        {DATE}
      </span>
    );
  });
  // alert(eventDate);
  let eventElem;
  if (eventDate) {
    eventElem = props.data.map((event) => {
      const convDateEvent = new Date(event.date);
      const c1 = convDateEvent.getDate() === eventDate.getDate();
      const c2 = convDateEvent.getMonth() === eventDate.getMonth();
      const c3 = convDateEvent.getFullYear() === eventDate.getFullYear();
      if (c1 && c2 && c3) {
        return (
          <div
            key={nanoid()}
            className="event"
            onClick={() => showEventDescription(event)}
          >
            <h2 key={nanoid()}>{event.title}</h2>
            <div key={nanoid()}>
              <span key={nanoid()}>{event.start}</span>
              <span key={nanoid()}>{event.end}</span>
            </div>
          </div>
        );
      }
      return null;
    });
  }

  //alert(date[0].getDay()+' '+date[2].toLocaleString('default', {month : 'long'}))
  function changeBackYear(index) {
    const l = document.getElementsByClassName("year-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor =
        i === index || i === yearSelectIndex ? "red" : "transparent";
    }
  }
  function changeBackMonth(index){
    const l = document.getElementsByClassName("month-value")
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor =
        i === index || i === monthSelectIndex ? "red" : "transparent";
    }
  }
  function changeYear(y, i) {
    setYearSelected(y !== "All year" ? y : "");
    setYearSelectIndex(i);
    document.getElementById("year-selected").innerHTML = y;
  }
  function changeMonth(m, i) {
    setMonthSelected(m !== 'All month' ? m : "");
    setMonthSelectIndex(i)
    document.getElementById("month-selected").innerHTML = m

    /*setDate(newDate);
    setEventDate(newDate[0]);*/
  }

  return (
    <div style={style}>
      <h1 style={hStyle}>
        You have {n} {n > 1 ? "events" : "event"}
      </h1>
      <div className="year-month">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="container-month-year"
            onClick={() => setShowYearList((prev) => !prev)}
          >
            <span id="year-selected">All year</span>
            <span class="material-icons">expand_more</span>
          </div>
          <div
            style={{
              position: "absolute",
              display: showYearList ? "block" : "none",
              color: "black",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              top: "135px",
              maxHeight: "200px",

              borderRadius: "10px",
              zIndex: "1",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {yearList}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="container-month-year"
            onClick={() => setShowMonthList((prev) => !prev)}
          >
            <span id="month-selected">All month</span>
            <span class="material-icons">expand_more</span>
          </div>
          <div
            style={{
              display: showMonthList ? "block" : "none",
            }}
            className="month-list"
          >
            {months}
          </div>
        </div>
      </div>
      <div className="event_day">{dayList}</div>
      <div style={eventStyle}>{eventElem}</div>
      {showEventDesc ? eventDesc : <></>}
    </div>
  );
}
