import { useEffect, useState } from "react";

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
          setIsRunning(false)
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

  const handleTimer = () => {
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
      <button onClick={handleMode}>Switch to Temporizer</button>
      <h1>{mode == "cronometer" ? "cronometer" : "temporizer"}</h1>
      <h1>
        {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
      </h1>
      {mode == "temporizer" ? (
        <>
          <span>Minutes</span>
          <input type="text" value={minutes} onChange={handleMinutes} />
          <br />

          <span>Seconds</span>
          <input type="text" value={seconds} onChange={handleSeconds} />
        </>
      ) : null}
      <button onClick={handleTimer}>{isRunning ? "Pause" : "Start"}</button>
    </>
  );
}

export default App;
