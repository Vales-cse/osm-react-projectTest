import type { Place } from "../api/Place";
import React, { useState } from "react";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = await search(term);
    setPlaces([...places, ...results]);
  };

  const handleDelete = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    //Evito di attivare onClick della lista (oggetto parent)
    event?.stopPropagation();
    setPlaces(places.filter(place => place.id !== id));
  };

  const itemSearched = () => {
    return (
      <>
        <h1 className="fs-5">Results:</h1>
        <ul className="list-group">
          {places.map((place) => (
            <li
              key={place.id}
              className="list-group-item list-group-item-action d-flex justify-content-between"
              onClick={() => onPlaceClick(place)}
            >
              {place.name}
              <button className="btn btn-danger" onClick={(event) => handleDelete(place.id, event)}>X</button>
            </li>
          ))}
        </ul>
      </>
    );
  };

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
      <h1 className="text-uppercase fs-5">Found Location:</h1>
      {itemSearched()}
    </div>
  );
}
