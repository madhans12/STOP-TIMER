import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [taps, setTaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = (updatedTaps) => {
    setIsActive(false);
    setSeconds(0);
    setTaps([]);
  };
  const deleteTap = (index) => {
    const updatedTaps = [...taps];
    updatedTaps.splice(index, 1);
    setTaps(updatedTaps);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes < 10 ? 0 : ""}${minutes}:${
      seconds < 10 ? 0 : ""
    }${seconds}`;
  };
  const CollectTime = () => {
    setTaps([...taps, formatTime(seconds)]);
  };

  return (
    <div className="container">
      <div className="App">
        <h1> TIMER</h1>
        <div className="timer">
          <button className="box">{formatTime(seconds)}</button>
        </div>
        <div className="buttons">
          {!isActive ? (
            <button onClick={startTimer}>Start</button>
          ) : (
            <button onClick={stopTimer}>Stop</button>
          )}

          {isActive ? (
            <button onClick={CollectTime}>Tap</button>
          ) : (
            <button onClick={resetTimer}>Reset</button>
          )}

          {taps.map((tap, index) => (
            <div className="times">
              <p> {index + 1}.</p>
              <li key={index}>
                {tap}
                {<button onClick={deleteTap}>X</button>}
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
