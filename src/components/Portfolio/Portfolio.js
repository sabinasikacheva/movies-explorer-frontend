import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__links">
        <li className="portfolio__links-item">
          <a
            href="https://sabinasikacheva.github.io/how-to-learn/"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__subtitle">Статичный сайт</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a
            href="https://sabinasikacheva.github.io/russian-travel/"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__subtitle">Адаптивный сайт</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a
            href="https://mesto.sikacheva.nomoreparties.sbs"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__subtitle">Одностраничное приложение</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;