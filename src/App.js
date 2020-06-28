import React from "react";
import "./App.css";
import Pathfinder from "./components/Pathfinder";

function App() {
  return (
    <div className="app">
      <Pathfinder gridRows={30} gridColumns={50} />
    </div>
  );
}

export default App;
