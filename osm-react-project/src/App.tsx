import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";
import type { Place } from "./api/Place";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-4"><LocationSearch/></div>
        <div className="col-8"><Map/></div>
      </div>
    </div>
  );
}

export default App;
