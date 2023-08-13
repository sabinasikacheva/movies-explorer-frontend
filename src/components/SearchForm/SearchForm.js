import React, { useEffect } from 'react';
import './SearchForm.css';
import { searchMovies } from '../../utils/searchMovies';

function SearchForm(props) {

  useEffect(() => {
    if (props.myMoviesPage) {
      props.getAllMovies()
    };
  }, [props.cards]);

  function startSearch() {
    props.setStartingSearchMyPage(true)
    props.setPreloader(true)
    props.setStartingSearch(false)
    props.getAllMovies()
  }

  function handleSearchChange(evt) {
    props.setSearch(evt.target.value);
    localStorage.setItem("lastSearch", evt.target.value);
    if (window.location.pathname === '/movies') {
      localStorage.setItem("search", evt.target.value);
    }
    if (evt.target.value !== "") {
      props.setErrorMessageSearchForm("");
    } else {
      props.setErrorMessageSearchForm("Введите запрос");
    }
  }
  
  const handleCheckboxValueChange = (evt) => {
    const newCheckboxValue = evt.target.checked;
    props.setCheckboxValue(newCheckboxValue);
    localStorage.setItem("lastCheckboxValue", JSON.stringify(newCheckboxValue));
    searchMovies(props.allMovies, props.search, newCheckboxValue, props.setResultSearchMovies, props.setNotFound);
  };

  function handleSubmit(evt) {
      evt.preventDefault();
      startSearch();
  }

  return (
    <form
      className="seachform"
    onSubmit={handleSubmit}
    >
      <div className="seachform__input-container">
        <input
          className="seachform__input"
          placeholder="Фильм"
          required
          onChange={handleSearchChange}
          value={props.search}
        ></input>
        <button
          className="seachform__button button"
          type="submit"
          onClick={handleSubmit}
        ></button>
      </div>
      <span className="searchform__span">{props.errorMessageSearchForm}</span>
      <div className="seachform__checkbox-conteiner">
        <input
          className="seachform__checkbox"
          type="checkbox"
          id="seachform__checkbox"
          value="yes"
          onChange={handleCheckboxValueChange}
          checked={props.checkboxValue}
        ></input>
        <label className="seachform__label link" htmlFor="seachform__checkbox">Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;