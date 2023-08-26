import React from "react";

import "./index.css";
//import "./index.css";

export default function Event(props) {
  const [showEventDesc, setShowEventDesc] = React.useState(false);
  const [eventPos, setEventPos] = React.useState(0);
  const [eventNbrShow, setEventNbrShow] = React.useState(0);
  const [dateString, setDateString] = React.useState("");
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
  const [windowWidthHeight, setWindowWidthHeight] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  React.useEffect(() => {
    setSubEventElem(eventElem.slice(eventPos, eventPos + eventNbrShow));
  }, [eventNbrShow, eventPos, eventElem]);
  React.useEffect(() => {
    try {
      const ht =
        document.getElementsByClassName("event-elem-style")[0].offsetHeight;
      const he = document.getElementsByClassName("event")[0].offsetHeight;
      let nbrEvent = ht / he;
      if (nbrEvent < parseInt(nbrEvent) + 0.15)
        nbrEvent = parseInt(nbrEvent) - 1;
      else nbrEvent = parseInt(nbrEvent);

      while (he * nbrEvent + 8 * (nbrEvent - 1) > ht) {
        nbrEvent -= 1;
      }
      setEventNbrShow(nbrEvent ? nbrEvent : 1);
    } catch (e) {
      console.log("Error found!");
    }
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
    document.getElementsByClassName("event-elem-style")[0].style.height =
      windowWidthHeight.width < 800
        ? `calc(${windowWidthHeight.height}px - 245px)`
        : `calc(${windowWidthHeight.height}px - 335px)`;
    /*document.getElementsByClassName(
      "event-elem-style"
    )[0].style.width = `calc(${windowWidthHeight.width}px -300px)`;*/
  }, [windowWidthHeight]);
  React.useEffect(() => {
    setEventNbreDate(0);
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
    //setSubEventElem([])
    setEventDate(newDate[0] ? newDate[0] : 1);
    setShowEventDesc(false);
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
  React.useEffect(() => {
    try {
      const newDateString = getDateString();
      setDateString(newDateString);
    } catch (err) {
      console.log(err);
    }
  }, [eventDate]);
  const Change = (d, index) => {
    setEventDate(d);
    setEventPos(0);
    setEventDateIndex(index);
    setShowEventDesc(false);
  };
  function getDateString() {
    const newDateString =
      daysOfWeek[eventDate.getDay()] +
      ", " +
      eventDate.getDate() +
      " " +
      eventDate.toLocaleString("default", { month: "long" });
    return newDateString;
  }
  const showEventDescription = (e) => {
    setShowEventDesc(true);
    const eDesc = (
      <div className={`event-desc-style`}>
        <span
          class="material-icons"
          style={clear_event_desc}
          onClick={() => setShowEventDesc(false)}
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
            <div className="date-str-event-desc">{getDateString()}</div>
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
      l[i].style.background =
        i === index
          ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
          : "transparent";
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
      l[i].style.backgroundColor =
        i === index
          ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
          : "transparent";
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
  React.useEffect(() => {
    try {
      let newEventElem = props.data.map((event) => {
        const convDateEvent = new Date(event.date);
        const c1 = convDateEvent.getDate() === eventDate.getDate();
        const c2 = convDateEvent.getMonth() === eventDate.getMonth();
        const c3 = convDateEvent.getFullYear() === eventDate.getFullYear();
        //alert('bloc executed')
        if (c1 && c2 && c3) {
          //console.log('yes')
          setEventNbreDate((prev) => prev + 1);
          return (
            <div
              className="event"
              onClick={() => showEventDescription(event)}
              style={{}}
            >
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
      l[i].style.background =
        i === yearSelectIndex
          ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
          : i === index
            ? "lightblue"
            : "transparent";
    }
  }
  function changeBackMonth(index) {
    const l = document.getElementsByClassName("month-value");
    for (let i = 0; i < l.length; i++) {
      l[i].style.background =
        i === monthSelectIndex
          ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
          : i === index
            ? "lightblue"
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
  }
  
  React.useEffect(() => {
    const b = document.getElementsByClassName('event')
    let index = 0

    function showNexEvent() {
      if (index < b.length) {
        b[index].style.opacity = 1
        index++
      } else {
        clearInterval(interval)
      }
    }
    const interval = setInterval(showNexEvent, 200)
  })
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
                ].style.background = "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"

              } catch (e) {
                console.log("The year list not rendered yet !");
              }
            }}
          >
            <span id="year-selected">All year</span>
            <span class="material-icons">expand_more</span>
          </div>
          <ul
            style={{ display: showYearList ? "block" : "none" }}
            className="year-list"
            onMouseLeave={() => {
              setShowYearList(false);
              const l = document.getElementsByClassName("year-value");
              for (let i = 0; i < l.length; i++) {
                l[i].style.backgroundColor =
                  i === yearSelectIndex
                    ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
                    : "transparent";
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
                ].style.background = "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"

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
                l[i].style.background =
                  i === monthSelectIndex ? "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )"
                    : "transparent";
              }
            }}
          >
            {months}
          </ul>
        </div>
      </div>
      <div className="date-string">
        {eventNbreDate ? dateString : "No date found"}
      </div>
      <h1 className="how-many-ev-today">
        You have {eventNbreDate} {eventNbreDate > 1 ? "events" : "event"}
      </h1>
      <div className="sub-content-event-page">
        <div className="event_day">{dayList}</div>
        <div
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            color: "gray",
            marginTop: "15px",
            textAlign: windowWidthHeight.width >= 800 && "center",
          }}
        >
          You can see all details about the event, just click on it !
        </div>
        <div className="event-elem-style">
          {!eventNbreDate ? (
            <h1 style={{ textAlign: "center" }}>No event found!</h1>
          ) : subEventElem[0] ? (
            subEventElem
          ) : (
            eventElem
          )}
        </div>
      </div>
      <div
        className="next-back"
        style={{
          display:
            !eventNbreDate ||
              eventNbreDate === 1 ||
              eventNbreDate <= eventNbrShow
              ? "none"
              : "flex",
        }}
      >
        <button
          style={{
            background:
              eventPos - eventNbrShow >= 0
                ? "linear-gradient(to bottom, #0078d7, #0063b1)"
                : "gray",
          }}
          disabled={eventPos - eventNbrShow >= 0 ? 0 : 1}
          onClick={() => setEventPos((prevPos) => prevPos - eventNbrShow)}
        >
          Back
        </button>
        <button
          disabled={eventPos + eventNbrShow < eventNbreDate ? 0 : 1}
          style={{
            background:
              eventPos + eventNbrShow < eventNbreDate
                ? "linear-gradient(to bottom, #0078d7, #0063b1)"
                : "gray",
          }}
          onClick={() => setEventPos((prevPos) => prevPos + eventNbrShow)}
        >
          Next
        </button>
      </div>
      {showEventDesc ? eventDesc : <></>}
    </div>
  );
}
