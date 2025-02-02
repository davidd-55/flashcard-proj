import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";

export const ViewDeck = () => {
  const mountedRef = useRef(false);
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: "loading...", cards: [] });

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
        const response = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setDeck(() => ({ ...response }));
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

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(deckId);
      navigate("/");
    }
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
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-header text-center">
          <h2>{deck.name}</h2>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{deck.description}</p>
          </blockquote>
          <div className="d-flex justify-content-around">
            <Link to={`/decks/${deck.id}/edit`}>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/decks/${deck.id}/edit`)}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(`/decks/${deck.id}/study`)}
              >
                <i className="fas fa-book"></i> Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(`/decks/${deck.id}/cards/new`)}
              >
                <i className="fas fa-plus"></i> Add Cards
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(deckId)}
            >
              <i className="fas fa-trash"></i> Delete Deck
            </button>
          </div>
        </div>
      </div>
      <div>
        <Outlet context={[deck]} />
      </div>
    </div>
  );
}

export default ViewDeck;
