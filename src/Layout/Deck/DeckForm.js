import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const DeckForm = ({
  deckId,
  newDeckData,
  changeHandler,
  submitHandler,
}) => {
  const navigate = useNavigate();
  return (
    <form onSubmit={submitHandler}>
      <h1 className="my-4 text-center">Edit Deck</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          className="form-control form-control-lg"
          type="text"
          placeholder="Deck Name"
          onChange={changeHandler}
          value={newDeckData.name}
          required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="5"
          placeholder="Brief description of the deck"
          onChange={changeHandler}
          value={newDeckData.description}
          required
        ></textarea>
      </div>
      <Link to="/" className="mr-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>
      </Link>
      <button
        type="submit"
        className="btn btn-primary"
        onSubmit={submitHandler}
      >
        Submit
      </button>
    </form>
  );
};

export default DeckForm;
