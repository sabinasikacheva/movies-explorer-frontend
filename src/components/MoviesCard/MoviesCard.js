import React, { useState, useContext, useEffect } from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {

  const [like, setLike] = useState(false);
  const baseUrl = "https://api.nomoreparties.co";
  const relativePath = props.card.image.url;
  const fullUrl = baseUrl + relativePath;

  const currentUser = useContext(CurrentUserContext);

  const movieData = {
    country: props.card.country,
    director: props.card.director,
    duration: props.card.duration,
    year: props.card.year,
    description: props.card.description,
    image: baseUrl + props.card.image.url,
    trailerLink: props.card.trailerLink,
    thumbnail: baseUrl + props.card.image.url,
    owner: currentUser._id,
    movieId: props.card.id,
    nameRU: props.card.nameRU,
    nameEN: props.card.nameEN,
  };

  useEffect(() => {
    if (props.allCards && props.myCards) {
      const likeCards = props.allCards.filter(card => {
        return props.myCards.some(myCard => myCard.movieId === card.id);
      });
        setLike(likeCards.some(card => card.id === props.card.id));
      }
//  }, [props.myCards]);
 }, [props.card.id, props.myCards]);

  const handleLikeClick = () => {
    if (like) {
      const deleteCard = props.myCards.find(card => card.movieId === props.card.id);
        if (deleteCard) {
          props.deleteMovies(deleteCard);
          console.log("карточка удалена", deleteCard);
          return;
        } else {
          console.log("Объект не найден");
        }
    } else {
        if (!props.myMoviesPage) {
          props.saveMovies(movieData);
            setLike(!like);
        } else {
          props.deleteMovies(props.card);
        }
    }
  };
  // длительность фильма в часах и минутах
  const durationHours = props.card.duration >= 60 ? `${Math.floor(props.card.duration / 60)} ч ` : '';
  const durationMinut = props.card.duration === 60 ? '' : `${props.card.duration % 60} м`;
  const duration = durationHours + durationMinut;
  
  return (
    <li className="card">
      <a href={props.card.trailerLink}  className="card__link link" target="blank">
        <img className="card__image" alt={props.card.nameRU} src={props.myMoviesPage ? props.card.image : fullUrl} />
      </a>
        <div className="card__content">
          <h2 className="card__name">{props.card.nameRU}</h2>
          <button
            type="button"
            className={
              props.myMoviesPage
                ? "  card__button card__button_save card__button_delete"
                : like
                ? "card__button card__button_save card__button_saved"
                : "card__button card__button_save"
            }
            onClick={handleLikeClick}
            ></button>
        </div>
      <p className="card__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;