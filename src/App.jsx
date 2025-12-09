import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import TeamList from "./components/TeamList";
import Home from "./components/Home";
import MemberDetails from "./components/MemberDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teamlist" element={<TeamList />} />
        <Route path="/member/:memberId" element={<MemberDetails />} />
      </Routes>
    </div>
  );
}

export default App;
