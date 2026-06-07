import { useEffect, useState } from "react";
import "./App.css";

const Button = ({ handleClick, text, className }) => (
  <button className={className} onClick={handleClick}>
    {text}
  </button>
);
const Timer = ({ seconds, minutes }) => {
  return (
    <>
      <h1>
        {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
      </h1>
    </>
  );
};

const TimeInput = ({ time, changeTime, text, mode, max, className }) => {
  if (mode == "temporizer") {
    return (
      <>
        <input type="text" value={time} onChange={changeTime} placeholder={text} className="timeInput" className={className} maxLength={max}/>
      </>
    );
  }
};

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [mode, setMode] = useState("cronometer");

  useEffect(() => {
    if (!isRunning) return;
    if (mode == "cronometer") {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 60) {
            setMinutes((m) => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }

    if (mode == "temporizer") {
      const interval = setInterval(() => {
        if (seconds == 0 && minutes == 0) {
          setIsRunning(false);
          return () => clearInterval(interval);
        }
        setSeconds((prev) => {
          if (prev <= 0) {
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, mode, minutes, seconds]);

  const handleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleCronometer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setMode("cronometer");
  };

  const handleTemporizer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setMode("temporizer");
  };

  const handleSeconds = (e) => {
    if(Number(e.target.value < 60)) setSeconds(Number(e.target.value));
  };
  const handleMinutes = (e) => {
    setMinutes(Number(e.target.value));
  };

  return (
    <div className="wrapper">
      <div>
        <Button
          handleClick={handleCronometer}
          className={"left-btn"}
          text={"cronometer"}
        />
        <Button
          handleClick={handleTemporizer}
          className={"right-btn"}
          text={"temporizer"}
        />
      </div>

      <div className="container">
        <Timer seconds={seconds} minutes={minutes} />
      </div>
      <div className="input-wrapper">
        <TimeInput
          text={"minutes"}
          time={minutes}
          changeTime={handleMinutes}
          mode={mode}
          max={"3"}
          className={"left-input"}
        />
        <TimeInput
          text={"seconds"}
          time={seconds}
          changeTime={handleSeconds}
          mode={mode}
          max={"2"}
          className={"right-input"}
        />
      </div>

      <Button
        className="button"
        handleClick={handleRunning}
        text={isRunning ? "Stop" : "Start"}
      />
    </div>
  );
}

export default App;
