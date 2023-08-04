import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

 //код для отрисовки карточек// 
  const cardsTotal = 16;
  const cardsTotalSaved = 4;
  const cards = Array(cardsTotal).fill(null);
  const savedCards = Array(cardsTotalSaved).fill(null);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies" 
          element={
            <Movies
              loggedIn={loggedIn}
              cards={cards}
            />
          }
        />
        <Route path="/saved-movies" 
          element={
            <SavedMovies 
              loggedIn={loggedIn} 
              cards={savedCards}
            />
          } 
        />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*"element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;