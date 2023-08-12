import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { IconContext } from "@onemind-services-llc/react-icons-ng-pack";
import { FaFolder } from "@onemind-services-llc/react-icons-ng-pack/fa/FaFolder";
import { MdAccessibility } from "@onemind-services-llc/react-icons-ng-pack/md/MdAccessibility";
import { TiArrowDown } from "@onemind-services-llc/react-icons-ng-pack/ti/TiArrowDown";
import { GrGrommet } from "@onemind-services-llc/react-icons-ng-pack/gr/GrGrommet";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <IconContext.Provider
            value={{
              color: "blue",
              className: "global-class-name",
              attr: { focusable: "false" },
            }}
          >
            <MdAccessibility />
            <FaFolder
              color="red"
              title="folder icon"
              className="additional-class-name"
            />
          </IconContext.Provider>
          <MdAccessibility />
          <FaFolder />
          <TiArrowDown title="arrow down icon" />
          <GrGrommet />
        </p>
      </div>
    );
  }
}

export default App;
