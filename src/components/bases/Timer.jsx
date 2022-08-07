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
  const [lastClick, setLastClick] = React.useState("Reset");
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
      "Started: " +
        saveH.toString().padStart(2, "0") +
        ":" +
        saveM.toString().padStart(2, "0") +
        ":" +
        saveS.toString().padStart(2, "0"),
      ...history,
    ]);
    setLastClick("Start");
  };
  const continueTimer = () => {
    setStartTime(new Date());
    setStarted(true);
    setHistory(["Resumed. ", ...history]);
    setLastClick("Continue");
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
      "Stopped. " +
        ((isFocus ? " (Focused: " : " (Break: ") +
          ((new Date() - startTime) / 60000).toFixed(0) +
          (((new Date() - startTime) / 60000).toFixed(0) === 1
            ? " min.)"
            : " mins.)")),
      ...history,
    ]);
    setLastClick("Stop");
  };
  const resetTimer = () => {
    setHistory([
      "Reset to: " +
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
    setLastClick("Reset");
  };

  React.useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setTimeout(() => {
          if (s === 0) {
            if (m === 0) {
              if (h === 0) {
                setH(0);
                setM(0);
                setS(0);
                setStarted(false);
                setHistory([
                  "Finished: " +
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
                setLastClick("Ended");
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
        }, 10);
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
    setLastClick("Reset");
  };
  const randomKaomoji = () => {
    const kaomoji = [
      "(っ °Д °;)っ",
      "ヽ(´▽`)/",
      "(▀̿Ĺ̯▀̿ ̿)",
      "ヽ(ﾟДﾟ)ﾉ",
      "Σ(☉ω☉ノ)/",
      "Σ(O_O)",
      "w(ﾟДﾟ)w",
      "(＃°Д°)",
      "(ʘ ͟ʖ ʘ)",
      "༼ つ ◕_◕ ༽つ",
      "(ﾉ◕ヮ◕)ﾉ",
      "━Σ(ﾟДﾟ|||)━",
      "?(⚈○ ⚈)◞",
      "lim △t: △t → 0",
    ];
    kaomoji.reverse();
    return kaomoji[Math.floor(Math.random() * kaomoji.length)];
  };
  return (
    <div>
      <h2
        className={
          lastClick === "Ended" || lastClick === "Stop"
            ? "main-look-timer timer-blink"
            : lastClick === "Reset"
            ? "alt-look-timer"
            : "main-look-timer"
        }
      >
        {lastClick === "Reset"
          ? h.toString().padStart(2, "0") === "00"
            ? m.toString().padStart(2, "0") === "00"
              ? s.toString().padStart(2, "0") === "00" &&
                m.toString().padStart(2, "0") === "00" &&
                h.toString().padStart(2, "0") === "00"
                ? randomKaomoji()
                : s.toString().padStart(2, "0")
              : m.toString().padStart(2, "0") +
                ":" +
                s.toString().padStart(2, "0")
            : h.toString().padStart(2, "0") +
              ":" +
              m.toString().padStart(2, "0")
          : h.toString().padStart(2, "0") === "00"
          ? m.toString().padStart(2, "0") === "00"
            ? s.toString().padStart(2, "0") === "00" &&
              m.toString().padStart(2, "0") === "00" &&
              h.toString().padStart(2, "0") === "00"
              ? "End."
              : s.toString().padStart(2, "0")
            : m.toString().padStart(2, "0") +
              ":" +
              s.toString().padStart(2, "0")
          : h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0")}
      </h2>
      <div className="timer-controls-container">
        {(lastClick === "Reset" || lastClick === "Ended") && (
          <div>
            <button onClick={startTimer}>
              <svg
                width="128"
                height="128"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="M20.463,7.713l-9.1-6.677A5.317,5.317,0,0,0,2.9,5.323V18.677a5.311,5.311,0,0,0,8.46,4.287l9.105-6.677a5.315,5.315,0,0,0,0-8.574Zm-1.774,6.155-9.1,6.677A2.317,2.317,0,0,1,5.9,18.677V5.323a2.276,2.276,0,0,1,1.27-2.066A2.328,2.328,0,0,1,8.223,3a2.3,2.3,0,0,1,1.362.455l9.1,6.677a2.316,2.316,0,0,1,0,3.736Z"
                    fill="#00213a"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        )}
        {(lastClick === "Start" || lastClick === "Continue") && (
          <div>
            <button onClick={stopTimer}>
              <svg
                width="128"
                height="128"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="M7,0A4,4,0,0,0,3,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,7,0ZM8,20a1,1,0,0,1-2,0V4A1,1,0,0,1,8,4Z"
                    fill="#000305"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M17,0a4,4,0,0,0-4,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,17,0Zm1,20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0Z"
                    fill="#000305"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        )}
        {lastClick === "Stop" && (
          <div>
            <button onClick={continueTimer}>
              <svg
                width="128"
                height="128"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="M20.463,7.713l-9.1-6.677A5.317,5.317,0,0,0,2.9,5.323V18.677a5.311,5.311,0,0,0,8.46,4.287l9.105-6.677a5.315,5.315,0,0,0,0-8.574Zm-1.774,6.155-9.1,6.677A2.317,2.317,0,0,1,5.9,18.677V5.323a2.276,2.276,0,0,1,1.27-2.066A2.328,2.328,0,0,1,8.223,3a2.3,2.3,0,0,1,1.362.455l9.1,6.677a2.316,2.316,0,0,1,0,3.736Z"
                    fill="#00213a"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </button>
            <button onClick={resetTimer}>
              <svg
                width="128"
                height="128"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="M1.611,12c.759,0,1.375,.57,1.485,1.32,.641,4.339,4.389,7.68,8.903,7.68,5.476,0,9.827-4.917,8.867-10.569-.453-2.665-2.148-5.023-4.523-6.313-3.506-1.903-7.48-1.253-10.18,1.045l1.13,1.13c.63,.63,.184,1.707-.707,1.707H2c-.552,0-1-.448-1-1V2.414c0-.891,1.077-1.337,1.707-.707l1.332,1.332C7.6-.115,12.921-1.068,17.637,1.408c3.32,1.743,5.664,5.027,6.223,8.735,1.122,7.437-4.633,13.857-11.86,13.857-6.021,0-11.021-4.457-11.872-10.246-.135-.92,.553-1.754,1.483-1.754Z"
                    fill="#00223c"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        )}
      </div>
      <br />
      <div
        className={
          lastClick === "Reset" || lastClick === "Ended"
            ? "timer-reco-visible"
            : "timer-reco-invisible"
        }
      >
        <button onClick={() => setTime(0, 30, 0)}>30 min</button>
        <button onClick={() => setTime(1, 0, 0)}>1 hr</button>
        <button onClick={() => setTime(2, 0, 0)}>2 hrs</button>
        <p>------</p>
        <button onClick={() => setTime(h + 1, m, s)}>+1 hr</button>
        <button onClick={() => setTime(h - 1, m, s)}>-1 hr</button>
        <p>------</p>
        <button onClick={() => setTime(h, m + 15, s)}>+15 min</button>
        <button onClick={() => setTime(h, m - 15, s)}>-15 min</button>
        <p>------</p>
        <button onClick={() => setTime(h, m + 1, s)}>+1 min</button>
        <button onClick={() => setTime(h, m - 1, s)}>-1 min</button>
      </div>
      <div
        className={
          lastClick === "Ended" || lastClick === "Reset"
            ? "timer-input-visible"
            : "timer-input-invisible"
        }
      >
        <div>
          <input
            type="number"
            placeholder={h.toString().padStart(2, "0")}
            onChange={(e) =>
              e.target.value > 0
                ? e.target.value < 99
                  ? setTime(parseInt(e.target.value), m, s)
                  : setTime(99, m, s)
                : setTime(0, m, s)
            }
            min="0"
            max="99"
          />
          :
          <input
            type="number"
            placeholder={m.toString().padStart(2, "0")}
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
            placeholder={s.toString().padStart(2, "0")}
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
        </div>
      </div>
      <br />
      <div className="sidebar">
        <div
          className="timer-details sidebar-card"
          style={{}}
          onClick={() => setIsFocus(!isFocus)}
        >
          <div className="visible-sidebar-card-info">
            # Focus: {totalTimeFocused.toFixed(0)}
            {totalTimeFocused.toFixed(0) === 1 ? " min" : " mins"} <br /> #
            Break: {totalTimeBreak.toFixed(0)}
            {totalTimeBreak.toFixed(0) === 1 ? " min" : " mins"}
          </div>
          {isFocus ? (
            <div className="invisible-sidebar-card-info">
              The coffee needs your attention. <br />
              Click to switch to break mode.
            </div>
          ) : (
            <div className="invisible-sidebar-card-info">
              The polar bear is back from his hibernation. Are you?
            </div>
          )}
        </div>
        <div
          className="timer-details sidebar-card-long"
          style={{}}
          onClick={() => setIsFocus(!isFocus)}
        >
          <div>History:</div>
          <ul className="timer-history-timeline">
            {history.map((item, index) => (
              <li key={index} className="timer-history-item">
                <nav>{item}</nav>
              </li>
            ))}
            <li className="timer-history-item">
              The lazy organism seems to have become responsible!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
