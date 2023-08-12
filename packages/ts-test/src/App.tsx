import React from "react";
import "./App.css";
import { IconContext } from "@onemind-services-llc/react-icons-ng";
import { FaBeer } from "@onemind-services-llc/react-icons-ng/fa";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <IconContext.Provider value={{ color: "#fa7" }}>
          <FaBeer />
        </IconContext.Provider>
      </header>
    </div>
  );
};

export default App;
