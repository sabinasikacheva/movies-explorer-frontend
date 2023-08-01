import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__navigation">
        <p className="footer__copyright">&copy; 2023</p>
        <ul className="footer__links">
          <li className="footer__links-item"><a href="https://practicum.yandex.ru" className="footer__link link" target="blank">Яндекс.Практикум</a></li>
          <li className="footer__links-item"><a href="https://github.com/sabinasikacheva" className="footer__link link" target="blank">Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;