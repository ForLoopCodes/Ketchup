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
        {ActiveTab === "Dashboard" && <Dashboard />}
        {ActiveTab === "Timer" && <Timer />}
        {ActiveTab === "Tasks" && <Tasks />}
        {ActiveTab === "Tally" && <Tally />}
        {ActiveTab === "Expenses" && <Expenses />}
        {ActiveTab === "Mood" && <Mood />}
        {ActiveTab === "LeaveScreen" && <LeaveScreen />}
      </div>
    </div>
  );
}
