import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

export const AddCard = () => {
  const mountedRef = useRef(false);
  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const [deck, setDeck] = useState({
    name: "loading...",
    description: "",
    cards: [],
  });
  const [newCardData, setNewCardData] = useState(initialFormState);
  const navigate = useNavigate();
  const { deckId } = useParams();
  // effect just for tracking mounted state
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
          setDeck(() => loadedDeck);
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
    setNewCardData((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, newCardData);
    setNewCardData(initialFormState);
    navigate(0);
  };
  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1 className="my-4 text-center">
        {deck.name}: <span>Add Card</span>
      </h1>
      <CardForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        newCardData={newCardData}
        deckId={deckId}
      />
    </React.Fragment>
  );
}

export default AddCard;
