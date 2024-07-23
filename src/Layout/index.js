import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";
import Home from "./Home";
import StudyDeck from "./Deck/StudyDeck";
import CreateDeck from "./Deck/CreateDeck";
import ViewDeck from "./Deck/ViewDeck";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";
import ViewCards from "./Card/ViewCards";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<ViewDeck />}>
            <Route path="" element={<ViewCards />} />
          </Route>
          <Route path="/decks/:deckId/study" element={<StudyDeck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default Layout;
