import React, { useState, useEffect  } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";
import { searchMovies } from '../../utils/searchMovies';

function Movies(props) {
  // const [search, setSearch] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("lastSearch") || '');
  // const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(JSON.parse(localStorage.getItem("lastCheckboxValue")) || false);
  const [startingSearch, setStartingSearch] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [preloader, setPreloader] = useState(false)
  const [myMoviesPage, setMyMoviesPage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(0);
  const [errorGetAllMovies, setErrorGetAllMovies] = useState(false);

    const getAllMovies = () => {
      const savedAllMoviesLocal = localStorage.getItem("allMoviesLocal");
      if (savedAllMoviesLocal) {
        setAllMovies(JSON.parse(savedAllMoviesLocal));
        searchMovies(JSON.parse(savedAllMoviesLocal), search, checkboxValue, props.setResultSearchMovies, setNotFound);
        setTimeout(() => {
          setPreloader(false);
        }, 1000);
      } else {
        moviesApi.getCards()
          .then((allMovies) => {
            localStorage.setItem("allMoviesLocal", JSON.stringify(allMovies));
            localStorage.setItem("lastSearch", search); // Сохранение последнего поиска
            localStorage.setItem("lastCheckboxValue", JSON.stringify(checkboxValue)); // Сохранение состояния чекбокса
            setAllMovies(allMovies);
            searchMovies(allMovies, search, checkboxValue, props.setResultSearchMovies, setNotFound);
            setPreloader(false);
          })
          .catch((err) => {
            console.error(err);
            setErrorGetAllMovies(true);
          });
      }
    };
    
    useEffect(() => {
      // Восстановление последних результатов поиска из localStorage
      const lastResultSearchMovies = JSON.parse(localStorage.getItem("lastResultSearchMovies"));
      if (lastResultSearchMovies) {
        props.setResultSearchMovies(lastResultSearchMovies);
      }
      getAllMovies();
    }, []);
    
    useEffect(() => {
      if (props.resultSearchMovies) {
        localStorage.setItem("resultSearchMovies", JSON.stringify(props.resultSearchMovies));
      }
    }, [props.resultSearchMovies]);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
      calculateCardsToShow();
        if (props.resultSearchMovies.length > cardsToShow) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
    }, [windowWidth, props.resultSearchMovies]);
  
    const calculateCardsToShow = () => {
      let newCardsToShow = 0;
        if (windowWidth >= 1280) {
          newCardsToShow = 16;
        } else if (windowWidth >= 990) {
          newCardsToShow = 12;
        } else if (windowWidth >= 768) {
          newCardsToShow = 8;
        } else {
          newCardsToShow = 5;
        }
        setCardsToShow(newCardsToShow);
    };

    const handleShowMore = () => {
      const remainingCards = props.resultSearchMovies.length - cardsToShow;
        let increment;
        if (windowWidth >= 1280) {
          increment = 4;
        }
        else if (windowWidth >= 990) {
          increment = 3;
        }
        if (windowWidth <= 990) {
          increment = 2;
        }
      const newCardsToShow = Math.min(cardsToShow + increment, props.resultSearchMovies.length);
      setCardsToShow(newCardsToShow);
      setShowButton(newCardsToShow < props.resultSearchMovies.length);
    };
    
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm
          cards={props.resultSearchMovies}
          getAllMovies={getAllMovies}
          searchMovies={searchMovies}
          setSearch={setSearch}
          setCheckboxValue={setCheckboxValue}
          setStartingSearch={setStartingSearch}
          search={search}
          checkboxValue={checkboxValue}
          setPreloader={setPreloader}
          allMovies={allMovies}
          setNotFound={setNotFound}
          setResultSearchMovies={props.setResultSearchMovies}
          errorMessageSearchForm={props.errorMessageSearchForm}
          setErrorMessageSearchForm={props.setErrorMessageSearchForm}
          setStartingSearchMyPage={props.setStartingSearchMyPage}
        />
        <MoviesCardList
          cards={props.resultSearchMovies}
          startingSearch={startingSearch}
          notFound={notFound}
          preloader={preloader}
          saveMovies={props.saveMovies}
          myMoviesPage={myMoviesPage}
          deleteMovies={props.deleteMovies}
          myCards={props.cards}
          cardsToShow={cardsToShow}
          errorGetAllMovies={errorGetAllMovies}
        />
        <button className={showButton ? 'movies__add-button button' : "movies__add-button-off"} onClick={handleShowMore}>Ещё</button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;