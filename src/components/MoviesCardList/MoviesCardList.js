import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
    return (
      <section className="moviescardlist">
        {props.preloader && <Preloader />}
        <p className="moviescardlist__text">
          {props.startingSearch && !props.notFound ? "Нужно ввести ключевое слово" : (!props.startingSearch && props.notFound ? "Ничего не найдено" : "")}
          {props.errorGetAllMovies ? "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»" : ""}
        </p>
        <ul className="moviescardlist__cards">
        {props.cards.slice(0, props.cardsToShow).map((card, index) => (
          <MoviesCard
            key={index}
            card={card}
            saveMovies={props.saveMovies}
            myMoviesPage={props.myMoviesPage}
            setLike={props.setLike}
            like={props.like}
            deleteMovies={props.deleteMovies}
            myCards={props.myCards}
            allCards={props.cards}
          />
      ))}
        </ul>
      </section>
    );
}

export default MoviesCardList;