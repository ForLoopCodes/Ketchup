import React from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";
import Tally from "./bases/Tally";
import Expenses from "./bases/Expenses";
import Mood from "./bases/Mood";
import NavBar from "./bases/NavBar";
import Dashboard from "./bases/Dashboard";

export default function Main() {
  const [ActiveTab, setActiveTab] = React.useState("Timer");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="main">
      <NavBar
        handleChange={handleTabChange}
        className="navbar"
        activeTab={ActiveTab}
      />
      <hr />
      <div className="main-body">
        <div className={ActiveTab === "Dashboard" ? "hide-me" : "show-me"}>
          <Dashboard />
        </div>
        <div className={ActiveTab === "Timer" ? "show-me" : "hide-me"}>
          <Timer />
        </div>
        <div className={ActiveTab === "Tasks" ? "show-me" : "hide-me"}>
          <Tasks />
        </div>
        <div className={ActiveTab === "Tally" ? "show-me" : "hide-me"}>
          <Tally />
        </div>
        <div className={ActiveTab === "Expenses" ? "show-me" : "hide-me"}>
          <Expenses />
        </div>
        <div className={ActiveTab === "Mood" ? "show-me" : "hide-me"}>
          <Mood />
        </div>
        <div className={ActiveTab === "LeaveScreen" ? "show-me" : "hide-me"}>
          <LeaveScreen />
        </div>
      </div>
    </div>
  );
}
