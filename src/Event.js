import React from "react";
import { nanoid } from "nanoid";
import "./index.css";
//import "./index.css";

export default function Event(props) {
  const [showEventDesc, setShowEventDesc] = React.useState(false);
  const [eventPos, setEventPos] = React.useState(0);
  const [eventNbrShow, setEventNbrShow] = React.useState(0);
  const [datestring, setDateString] = React.useState("");
  const [yearSelectIndex, setYearSelectIndex] = React.useState(0);
  const [monthSelectIndex, setMonthSelectIndex] = React.useState(0);
  const [showYearList, setShowYearList] = React.useState(false);
  const [showMonthList, setShowMonthList] = React.useState(false);
  const [eventDateIndex, setEventDateIndex] = React.useState(0);
  const [eventDesc, setEventDesc] = React.useState(<></>);
  const [yearSelected, setYearSelected] = React.useState("");
  const [monthSelected, setMonthSelected] = React.useState("");
  const [date, setDate] = React.useState([]);
  const [eventElem, setEventElem] = React.useState([]);
  const [subEventElem, setSubEventElem] = React.useState([]);
  const [eventDate, setEventDate] = React.useState(0);
  const [eventNbreDate, setEventNbreDate] = React.useState(0);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [windowWidthHeight, setWindowWidthHeight] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  React.useEffect(() => {
    const getWidthHeight = () => {
      setWindowWidthHeight({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", getWidthHeight);
    return () => {
      window.removeEventListener("resize", getWidthHeight);
    };
  });
  //alert(eventNbrShow)
  const clear_event_desc = {
    cursor: "pointer",
    //border: "1px solid gray",
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "1px 1px 2px 2px lightgray",
  };
  React.useEffect(() => {
    document.getElementsByClassName(
      "event-elem-style"
    )[0].style.height = `calc(${windowWidthHeight.height}px - 200px)`;
    /*document.getElementsByClassName(
      "event-elem-style"
    )[0].style.width = `calc(${windowWidthHeight.width}px -300px)`;*/
  }, [windowWidthHeight]);
  React.useEffect(() => {
    setEventNbreDate(0);
  }, [eventDate]);
  React.useEffect(() => {
    try {
      const newDateString =
        daysOfWeek[eventDate.getDay()] +
        ", " +
        eventDate.getDate() +
        " " +
        eventDate.toLocaleString("default", { month: "long" });
      //alert(eventDate.toLocaleString("default", { day: "long" }));
      setDateString(newDateString);
    } catch (e) {
      console.log(e);
    }
  }, [eventDate]);
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
    newDate = newDate.map((d) => new Date(d));
    newDate.sort(props.compareDate);
    setDate(newDate);
    setEventDateIndex(0);
    setEventDate(newDate !== [] ? newDate[0] : 1);
  }, [monthSelected, yearSelected, props.data]);
  let year = props.data.map((e) => new Date(e.date).getFullYear());
  year = [...new Set(year)];
  year = year.sort();

  React.useEffect(() => {
    try {
      const l = document.getElementsByClassName("day");
      for (let i = 0; i < l.length; i++) {
        l[i].style.backgroundColor = i === eventDateIndex ? "#080c16" : "#ccc";
        l[i].style.color = i === eventDateIndex ? "#fff" : "#080c16";
        l[i].style.transition = "0.1s ease-in-out";
      }
    } catch (e) {
      console.log(e);
    }
  });
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
    <li
      className="year-value"
      onClick={() => HideYearList(y, index)}
      onMouseOver={() => changeBackYear(index)}
    >
      {y}
    </li>
  ));
  function HideYearList(y, index) {
    changeYear(y, index);
    setShowYearList(false);
    const l = document.getElementsByClassName("year-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor = i === index ? "#1fe374" : "transparent";
    }
  }
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
    <li
      onClick={() => HideMonthList(m, index)}
      onMouseOver={() => changeBackMonth(index)}
      className="month-value"
    >
      {m}
    </li>
  ));
  function HideMonthList(m, index) {
    changeMonth(m, index);
    setShowMonthList(false);
    const l = document.getElementsByClassName("month-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor = i === index ? "#1fe374" : "transparent";
    }
  }
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
  React.useEffect(() => {
    try {
      let newEventElem = props.data.map((event) => {
        const convDateEvent = new Date(event.date);
        const c1 = convDateEvent.getDate() === eventDate.getDate();
        const c2 = convDateEvent.getMonth() === eventDate.getMonth();
        const c3 = convDateEvent.getFullYear() === eventDate.getFullYear();
        //alert('bloc executed')
        if (c1 && c2 && c3) {
          setEventNbreDate((prev) => prev + 1);
          return (
            <div className="event" onClick={() => showEventDescription(event)}>
              <h2>{event.title}</h2>
              <div>
                <span>{event.start}</span>
                <span>{event.end}</span>
              </div>
            </div>
          );
        }

        return null;
      });
      newEventElem = newEventElem.filter((item) => item !== null);

      setEventElem(newEventElem);
    } catch (e) {
      console.log(e);
    }
  }, [eventDate, props.data]);

  function changeBackYear(index) {
    const l = document.getElementsByClassName("year-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor =
        i === yearSelectIndex
          ? "#1fe374"
          : i === index
          ? "lightgreen"
          : "transparent";
    }
  }
  function changeBackMonth(index) {
    const l = document.getElementsByClassName("month-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.backgroundColor =
        i === monthSelectIndex
          ? "#1fe374"
          : i === index
          ? "lightgreen"
          : "transparent";
    }
  }
  function changeYear(y, i) {
    setYearSelected(y !== "All year" ? y : "");
    setYearSelectIndex(i);
    document.getElementById("year-selected").innerHTML = y;
  }
  function changeMonth(m, i) {
    setMonthSelected(m !== "All month" ? m : "");
    setMonthSelectIndex(i);
    document.getElementById("month-selected").innerHTML = m;

    /*setDate(newDate);
    setEventDate(newDate[0]);*/
  }
  // alert(eventNbreDate)
  return (
    <div className="style-event-page">
      <div className="year-month">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //border : '1px solid red',
          }}
          onMouseLeave={() => setShowYearList(false)}
        >
          <div
            className="container-month-year"
            onClick={() => {
              setShowYearList((prev) => !prev);
              try {
                document.getElementsByClassName("year-value")[
                  yearSelectIndex
                ].style.backgroundColor = "#1fe374";
              } catch (e) {
                console.log("The year list not rendered yet !");
              }
            }}
          >
            <span id="year-selected">All year</span>
            <span class="material-icons">expand_more</span>
          </div>
          <ul
            style={{
              position: "absolute",
              listStyle: "none",
              padding: 0,
              fontFamily: "'Kanit', sans-serif",
              display: showYearList ? "block" : "none",
              color: "black",
              backgroundColor: "#d6dae5",
              cursor: "pointer",
              marginTop: "20px",
              maxHeight: "200px",
              borderRadius: "10px",
              zIndex: "1",
              marginRight: 20,
              overflowX: "hidden",
              overflowY: "auto",
            }}
            onMouseLeave={() => {
              setShowYearList(false);
              const l = document.getElementsByClassName("year-value");
              for (let i = 0; i < l.length; i++) {
                l[i].style.backgroundColor =
                  i === yearSelectIndex ? "#1fe374" : "transparent";
              }
            }}
          >
            {yearList}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onMouseLeave={() => {
            setShowMonthList(false);
          }}
        >
          <div
            className="container-month-year"
            onClick={() => {
              setShowMonthList((prev) => !prev);
              try {
                document.getElementsByClassName("month-value")[
                  monthSelectIndex
                ].style.backgroundColor = "#1fe374";
              } catch (e) {
                console.log("The month list not rendered yet !");
              }
            }}
          >
            <span id="month-selected">All month</span>
            <span class="material-icons">expand_more</span>
          </div>
          <ul
            style={{
              display: showMonthList ? "block" : "none",
            }}
            className="month-list"
            onMouseLeave={() => {
              setShowMonthList(false);
              const l = document.getElementsByClassName("month-value");
              for (let i = 0; i < l.length; i++) {
                l[i].style.backgroundColor =
                  i === monthSelectIndex ? "#1fe374" : "transparent";
              }
            }}
          >
            {months}
          </ul>
        </div>
      </div>
      <div className="date-string">
        {eventNbreDate ? datestring : "No date found"}
      </div>
      <h1 className="how-many-ev-today">
        You have {eventNbreDate} {eventNbreDate > 1 ? "events" : "event"}
      </h1>
      <div className="sub-content-event-page">
        <div className="event_day">{dayList}</div>
        <span
          style={{ fontFamily: "'Josefin Sans', sans-serif", color: "gray" }}
        >
          You can see all details about the event, just click on it !
        </span>
        <div className="event-elem-style">
          {eventNbreDate ? (
            eventElem
          ) : (
            <h2>Sorry, any event found in that date!</h2>
          )}
        </div>
      </div>
      {showEventDesc ? eventDesc : <></>}
    </div>
  );
}
