import React from "react";
import vid from "../assets/welcome.mp4";

export default function Welcome() {
    const title = "Calendar app";
    const [displayTitle, setDisplayTitle] = React.useState('');
    
    React.useEffect(() => {
        let i = -1;
        const interval = setInterval(() => {
            i++
            setDisplayTitle(prevTitle => prevTitle + title[i]);
            ;
            if (i === title.length-1) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="welcome-screen">
            <h1 className="welcome-title">{displayTitle}</h1>
            <video autoPlay loop muted>
                <source src={vid} type="video/mp4"/>
            </video>

        </div>
    );
}
