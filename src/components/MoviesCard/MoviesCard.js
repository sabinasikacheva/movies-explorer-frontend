import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import Film from '../../images/film.png';

function MoviesCard() {
  const location = useLocation();

  return (
    <li className="card">
      <a href="https://www.youtube.com/watch?v=JORGN8rUjyQ" className="card__link link" target="blank">
        <img className="card__image" src={Film} alt="Фотография из фильма" />
      </a>
        <div className="card__content">
          <h2 className="card__name">33 слова о дизайне</h2>
          {(location.pathname === "/movies") && <button className="card__button card__button_save button" type="button"></button>}
          {(location.pathname === "/saved-movies") && <button className="card__button card__button_delete" type="button"></button>}
        </div>
      <p className="card__duration">1ч 42м</p>
    </li>
  );
}

export default MoviesCard;