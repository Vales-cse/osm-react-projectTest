import type { Place } from "../api/Place";
import React, { useState } from "react";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('need search API', term);
  }

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <label className="form-label">Location search:</label>
        <input
          type="location"
          className="form-control"
          id="location"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
