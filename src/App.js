import React from "react";
import "./App.css";

import Pathfinder from "./components/Pathfinder";

function App() {
  return (
    <div className="App">
      <Pathfinder gridRows={20} gridColumns={50} />
    </div>
  );
}

export default App;
