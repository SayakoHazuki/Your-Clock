"use client";

import React from "react";
import "./App.css";
import { formatDate } from "./utils";

function App() {
    const [time, setTime] = React.useState(
        new Date().toLocaleTimeString("en-US")
    );
    const [date, setDate] = React.useState(
        new Date().toLocaleDateString("en-US")
    );
    const [timeFormat, setTimeFormat] = React.useState("h:mm:ss");
    const [dateFormat, setDateFormat] = React.useState("dddd, MMMM d, yyyy");

    setInterval(() => {
        const date = new Date();
        setTime(formatDate(date, timeFormat));
        setDate(formatDate(date, dateFormat));
    }, 1);

    return (
        <div className="App">
            <div className="Container">
                <div className="Clock">{time}</div>
                <div className="Date">{date}</div>
            </div>
        </div>
    );
}

export default App;
