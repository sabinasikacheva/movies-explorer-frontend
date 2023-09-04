import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

function Register({ onRegister, registerError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [formValid, setFormValid] = useState(false);
  
  const handleChangeName = (e) => {
    setName(e.target.value);
    setMessageStatus('');
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;
  
    if (e.target.value.length === 0) {
      setNameError('Поле не может быть пустым');
      setNameValid(false);
    } else if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30');
      setNameValid(false);
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setNameError('Некорректное имя');
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  };
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus('');
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
  
    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setEmailValid(false);
    } else if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email');
       setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  }
  
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setMessageStatus('');
  
    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым');
      setPasswordValid(false);
    } else if (e.target.value.length <= 7) {
      setPasswordError(
        'Длина пароля не может быть меньше 8 и больше 30 символов'
        );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  }
  
  function inputValid() {
    if (!nameValid || !emailValid || !passwordValid) {
      setFormValid(false);
      setMessageStatus('');
      return;
    }
    setFormValid(true);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, email, password });
  }
  
  useEffect(() => {
    inputValid();
  }, [name, email, password]);
  
  return (
    <section className="authorization">
      <Link className="authorization__link link" to="/">
          <img className="authorization__logo" src={Logo} alt="Логотип"></img>
      </Link>
      <h1 className="authorization__title">Добро пожаловать!</h1>
      <form
        className="authorization-form"
        action="#"
        name="authorization-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="authorization-form__fieldset">
          <div className="authorization-form__input-container">
              <label className="authorization-form__label" htmlFor="authorization-form__input-name">Имя</label>
              <input
                className="authorization-form__input"
                type="text"
                id="authorization-form__input-name"
                placeholder="Введите имя"
                name="name"
                required
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleChangeName}
              />
              <span className='authorization-form__error'>{nameError}</span>
          </div>
          <div className="authorization-form__input-container">
            <label className="authorization-form__label" htmlFor="authorization-form__input-email">E-mail</label>
              <input
                className="authorization-form__input"
                type="email"
                id="authorization-form__input-email"
                placeholder="Введите e-mail"
                name="email"
                required
                value={email}
                onChange={handleChangeEmail}
              />
              <span className='authorization-form__error'>{emailError}</span>
          </div>
          <div className="authorization-form__input-container">
            <label className="authorization-form__label" htmlFor="authorization-form__input-password">Пароль</label>
            <input
              className="authorization-form__input"
              type="password"
              id="authorization-form__input-password"
              placeholder="Введите пароль"
              name="password"
              required
              minLength="8"
              maxLength="30"
              value={password}
              onChange={handleChangePassword} 
            />
            <span className='authorization-form__error'>{passwordError}</span>
          </div>
        </fieldset>
          <span className="authorization-form__error authorization-form__error_server">{registerError}</span>
          <button
            className={`authorization-form__button button  ${
              !formValid ? 'authorization-form__button_disabled' : ''
            }`}
            type="submit"
            disabled={!formValid}
          >
            Зарегистрироваться
          </button>
          <div className="authorization-form__question-container">
              <p className="authorization-form__question">Уже зарегистрированы?</p>
              <Link className="authorization-form__question-link link" to="/signin">Войти</Link>
          </div>
      </form>
    </section>
  );
}

export default Register;