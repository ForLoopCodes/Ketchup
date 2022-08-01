import React from "react";

export default function Timer() {
  const [h, setH] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [s, setS] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(true);
  const [saveH, setSaveH] = React.useState(0);
  const [saveM, setSaveM] = React.useState(0);
  const [saveS, setSaveS] = React.useState(0);
  // to be saved in backend
  // ##############################################################
  const [history, setHistory] = React.useState([]);
  const [totalTimeFocused, setTotalTimeFocused] = React.useState(0);
  const [totalTimeBreak, setTotalTimeBreak] = React.useState(0);
  // ##############################################################
  const startTimer = () => {
    setStarted(true);
    setStartTime(new Date());
    setHistory([
      "timer started: " +
        saveH.toString().padStart(2, "0") +
        ":" +
        saveM.toString().padStart(2, "0") +
        ":" +
        saveS.toString().padStart(2, "0"),
      ...history,
    ]);
  };
  const continueTimer = () => {
    setStartTime(new Date());
    setStarted(true);
    setHistory([
      "timer continued: " +
        h.toString().padStart(2, "0") +
        ":" +
        m.toString().padStart(2, "0") +
        ":" +
        s.toString().padStart(2, "0"),
      ...history,
    ]);
  };
  const stopTimer = () => {
    setStarted(false);
    isFocus
      ? setTotalTimeFocused(
          totalTimeFocused +
            (new Date().getTime() - startTime.getTime()) / 60000
        )
      : setTotalTimeBreak(
          totalTimeBreak + (new Date().getTime() - startTime.getTime()) / 60000
        );
    setHistory([
      "timer stopped. " +
        ((isFocus ? " focused time: " : " break time: ") +
          ((new Date() - startTime) / 60000).toFixed(0) +
          (((new Date() - startTime) / 60000).toFixed(0) === 1
            ? " minute."
            : " minutes.")),
      ...history,
    ]);
  };
  const resetTimer = () => {
    setHistory([
      "timer reset to: " +
        saveH.toString().padStart(2, "0") +
        ":" +
        saveM.toString().padStart(2, "0") +
        ":" +
        saveS.toString().padStart(2, "0"),
      ...history,
    ]);
    setH(saveH);
    setM(saveM);
    setS(saveS);
    setStarted(false);
  };
  React.useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (s === 0) {
          if (m === 0) {
            if (h === 0) {
              setH(0);
              setM(0);
              setS(0);
              setStarted(false);
              setHistory([
                "timer finished: " +
                  saveH.toString().padStart(2, "0") +
                  ":" +
                  saveM.toString().padStart(2, "0") +
                  ":" +
                  saveS.toString().padStart(2, "0"),
                ...history,
              ]);
              isFocus
                ? setTotalTimeFocused(
                    totalTimeFocused +
                      (new Date().getTime() - startTime.getTime()) / 60000
                  )
                : setTotalTimeBreak(
                    totalTimeBreak +
                      (new Date().getTime() - startTime.getTime()) / 60000
                  );
            } else {
              setH(h - 1);
              setM(59);
              setS(59);
            }
          } else {
            setM(m - 1);
            setS(59);
          }
        } else {
          setS(s - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    started,
    h,
    m,
    s,
    saveH,
    saveM,
    saveS,
    isFocus,
    startTime,
    history,
    totalTimeBreak,
    totalTimeFocused,
  ]);
  if (h < 0) {
    setH(0);
    setM(0);
    setS(0);
  }
  if (m < 0) {
    setM(m + 60);
    setH(h - 1);
  }
  if (s < 0) {
    setS(s + 60);
    setM(m - 1);
  }
  if (m > 59) {
    setM(m - 60);
    setH(h + 1);
  }
  if (s > 59) {
    setS(s - 60);
    setM(m + 1);
  }
  const setTime = (hr, min, sec) => {
    setH(hr);
    setM(min);
    setS(sec);
    setSaveH(hr);
    setSaveM(min);
    setSaveS(sec);
  };
  return (
    <div>
      <h1>Timer.</h1>
      <h2>
        {h.toString().padStart(2, "0")}:{m.toString().padStart(2, "0")}:
        {s.toString().padStart(2, "0")}
      </h2>
      <h3>
        # Total focussed: {totalTimeFocused.toFixed(0)}
        {totalTimeFocused.toFixed(0) === 1 ? " minute." : " minutes."}
        <br /># Total break: {totalTimeBreak.toFixed(0)}
        {totalTimeBreak.toFixed(0) === 1 ? " minute." : " minutes."}
        <br />
        <button onClick={() => setIsFocus(!isFocus)}>
          {isFocus ? "swith to break mode" : "swith to focus mode"}
        </button>
      </h3>
      <br />
      <button onClick={startTimer}>Start</button>
      <button onClick={continueTimer}>Continue</button>
      <button onClick={stopTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <br />
      <button onClick={() => setTime(0, 30, 0)}>30 min</button>
      <button onClick={() => setTime(1, 0, 0)}>1 hr</button>
      <button onClick={() => setTime(2, 0, 0)}>2 hrs</button>
      <br />
      <button onClick={() => setTime(h + 1, m, s)}>+1 hr</button>
      <button onClick={() => setTime(h - 1, m, s)}>-1 hr</button>
      <button onClick={() => setTime(h, m + 15, s)}>+15 min</button>
      <button onClick={() => setTime(h, m - 15, s)}>-15 min</button>
      <button onClick={() => setTime(h, m + 1, s)}>+1 min</button>
      <button onClick={() => setTime(h, m - 1, s)}>-1 min</button>
      <br />
      <input
        type="number"
        placeholder={h}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 99
              ? setTime(parseInt(e.target.value), m, s)
              : setTime(99, m, s)
            : setTime(0, m, s)
        }
      />
      :
      <input
        type="number"
        placeholder={m}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 59
              ? setTime(h, parseInt(e.target.value), s)
              : setTime(h, 59, s)
            : setTime(h, 0, s)
        }
        min="0"
        max="59"
      />
      :
      <input
        type="number"
        placeholder={s}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 59
              ? setTime(h, m, parseInt(e.target.value))
              : setTime(h, m, 59)
            : setTime(h, m, 0)
        }
        min="0"
        max="59"
      />
      <br />
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
