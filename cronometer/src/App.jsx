import { useEffect, useState } from "react";
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Input = ({ value, change }) => (
  <input type="text" value={value} onChange={change} />
);
const Timer = ({ seconds, minutes, mode, handleMinutes, handleSeconds }) => {
  if (mode == "cronometer") {
    return (
      <>
        <h1>{mode}</h1>
        <h1>
          {String(minutes).padStart(2, "0")} :{" "}
          {String(seconds).padStart(2, "0")}
        </h1>
      </>
    );
  }

  return (
    <>
      <h1>{mode}</h1>
      <h1>
        {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
      </h1>
      <span>minutes</span>
      <Input value={minutes} change={handleMinutes} />
      <span>seconds</span>
      <Input value={seconds} change={handleSeconds} />
    </>
  );
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

  const handleMode = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    if (mode == "cronometer") {
      setMode("temporizer");
    } else setMode("cronometer");
  };

  const handleSeconds = (e) => {
    setSeconds(Number(e.target.value));
  };
  const handleMinutes = (e) => {
    setMinutes(Number(e.target.value));
  };

  return (
    <>
      <Button handleClick={handleMode} text={mode == "cronometer" ? "Switch to Temporizer" : "Switch to Cronometer"}/>
      <Timer seconds={seconds} minutes={minutes} mode={mode} handleMinutes={handleMinutes} handleSeconds={handleSeconds}/>
      <Button handleClick={handleRunning} text={isRunning ? "Stop" : "Start"} />
    </>
  );
}

export default App;
