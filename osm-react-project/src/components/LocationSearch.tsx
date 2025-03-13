import type { Place } from "../api/Place";
import React, { useState } from "react";
import { search } from "../api/search";
import ModalAlert from "./ModalAlert";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);

  //Attivare se si eccede il limite di 10 entry
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(places.length >= 10) {
      toggleModal();
      return;
    }

    const results = await search(term);
    setPlaces([...places, ...results]); //Non sovrascrivo i valori precedenti
    setTerm("");
  };

  const handleDelete = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    //Evito di attivare onClick della lista (oggetto parent)
    event?.stopPropagation();
    setPlaces(places.filter(place => place.id !== id));
  };

  const itemSearched = () => {
    return (
      <>
        <h1 className="fs-5">Results history:</h1>
        <ul className="list-group">
          {places.map((place) => (
            <li
              key={place.id}
              className="list-group-item list-group-item-action d-flex justify-content-between"
              onClick={() => onPlaceClick(place)}
            >
              {place.name}
              <button className="btn btn-outline-danger" onClick={(event) => handleDelete(place.id, event)}>X</button>
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
          disabled={showModal}
        />
      </form>
      {itemSearched()}
      <ModalAlert open={showModal} onClose={toggleModal} title={"Too many results!"} text={"You have reached the limit of 10 places."}/>
    </div>
  );
}
