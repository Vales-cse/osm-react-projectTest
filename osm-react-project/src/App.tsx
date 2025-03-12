import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";
import type { Place } from "./api/Place";
import { useState } from "react";

function App() {

  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className="App">
      <div className="row">
        <div className="col-4">
          <LocationSearch onPlaceClick={(place) => setPlace(place)}/>
        </div>
        <div className="col-8"><Map place={place}/></div>
      </div>
    </div>
  );
}

export default App;
