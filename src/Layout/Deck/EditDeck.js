import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export const EditDeck = () => {
  const mountedRef = useRef(false);
  const { deckId } = useParams();
  const navigate = useNavigate();

  const initialDeckState = { name: "", description: "" };
  const [editDeckFormData, setEditDeckFormData] = useState(initialDeckState);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setEditDeckFormData(() => loadedDeck);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setEditDeckFormData((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await updateDeck(editDeckFormData);
    setEditDeckFormData(initialDeckState);
    navigate(`/decks/${response.id}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              {editDeckFormData.name ? editDeckFormData.name : "Loading..."}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        newDeckData={editDeckFormData}
        deckId={deckId}
      />
    </div>
  );
}

export default EditDeck;
