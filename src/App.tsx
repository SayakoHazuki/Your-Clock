"use client";

import React, { useEffect } from "react";
import "./App.css";
import { formatDate } from "./utils";
import { FaGear } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function App() {
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const toggleSettings = () => setSettingsOpen(!settingsOpen);
    const closeSettings = () => setSettingsOpen(false);

    const [time, setTime] = React.useState(
        new Date().toLocaleTimeString("en-US")
    );
    const [date, setDate] = React.useState(
        new Date().toLocaleDateString("en-US")
    );
    const [timeFormat, _setTimeFormat] = React.useState("h:mm:ss");
    const [dateFormat, setDateFormat] = React.useState("dddd, MMMM d, yyyy");

    const setTimeFormat = (format: string) => {
        _setTimeFormat(format);
        console.log("Setting time format to", format);
        localStorage.setItem("timeFormat", format);
    };
    useEffect(() => {
        const interal = setInterval(() => {
            const date = new Date();
            // console.log(timeFormat);
            setTime(formatDate(date, timeFormat));
            setDate(formatDate(date, dateFormat));
        }, 1);
        return () => clearInterval(interal);
    });

    return (
        <div className="App">
            <div className="SettingsToggle" onClick={toggleSettings}>
                <FaGear />
            </div>
            <div className="Container" onClick={closeSettings}>
                <div className="Clock">{time}</div>
                <div className="Date">{date}</div>
            </div>
            <div
                className="SettingsModal"
                style={{
                    display: settingsOpen ? "block" : "none",
                }}
            >
                <div className="CloseButton" onClick={toggleSettings}>
                    <FaTimes />
                </div>

                {/* Time */}
                <label className="Label" htmlFor="timeFormat">
                    Time Format
                </label>
                <input
                    className="TextInput"
                    type="text"
                    id="timeFormat"
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                />

                {/* Date */}

                <label className="Label" htmlFor="dateFormat">
                    Date Format
                </label>
                <input
                    className="TextInput"
                    type="text"
                    id="dateFormat"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                />
            </div>
        </div>
    );
}

export default App;
