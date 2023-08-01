import React from 'react';
import './AboutMe.css';
import StudentPhoto from '../../images/aboutme-foto.jpg';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__title landing-title ">Студент</h2>
      <div className="aboutme__profile">
        <div className="aboutme__discription">
          <h3 className="aboutme__name">Виталий</h3>
          <p className="aboutme__job">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutme__link" href="https://github.com/sabinasikacheva" target="blank" rel="noreferrer">Github</a>
        </div>
        <img className="aboutme__photo" src={StudentPhoto} alt="Фотография студента" />
      </div>
    </section>
  )
}

export default AboutMe;