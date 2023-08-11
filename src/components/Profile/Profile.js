import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const { loggedIn, onUpdateUser, logOut, profileMessage } = props;

  const currentUser = useContext(CurrentUserContext);

  const [initChange, setInitChange] = useState(false);

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [updateForm, setUpdateForm] = useState();

  useEffect(() => {
    setButtonDisabled(currentUser.name === name && currentUser.email === email);
  }, [name, email, currentUser.name, currentUser.email]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  function handleClickEditButton(event) {
    event.preventDefault();
    setInitChange(true);
  }

  function handleChangeName(e) {
    setInitChange(true);
    setName(e.target.value);
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
    ) {
      setFormValid(false);
      setNameError('Имя должно отличаться от установленного');
    } else {
      setNameError(e.target.validationMessage);
      setFormValid(e.target.closest('form').checkValidity());
      setUpdateForm('');
    }
  }

  function handleChangeEmail(e) {
    setInitChange(true);
    setEmail(e.target.value);
    if (
      e.target.value === currentUser.email ||
      e.target.value === currentUser.email
    ) {
      setFormValid(false);
      setEmailError('Email должен отличаться от установленного');
    } else {
      setEmailError(e.target.validationMessage);
      setFormValid(e.target.closest('form').checkValidity());
      setUpdateForm('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ name, email }, setUpdateForm);
    setInitChange(false);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__greetings'>Привет, {name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <fieldset className='profile__user'>
            <div className='profile__data'>
              <label className='profile__data-field'>Имя</label>
              <input
                id='profile__name'
                className='profile__input'
                type='text'
                name='name'
                placeholder='Ваше имя'
                required
                minLength='2'
                maxLength='30'
                //defaultValue='Виталий'
                disabled={initChange ? false : true}
                value={name || ''}
                onChange={handleChangeName}
              />
            </div>
            <span className='profile__error'>{nameError}</span>
            <div className='profile__data'>
              <label className='profile__data-field'>E-mail</label>
              <input
                id='profile__email'
                className='profile__input'
                type='text'
                name='email'
                placeholder='Ваш email'
                //defaultValue='pochta@yandex.ru'
                required
                disabled={initChange ? false : true}
                value={email || ''}
                onChange={handleChangeEmail}
              />
            </div>
            <span className='profile__error'>{emailError}</span>
            <span className='profile__error'>
              {profileMessage}
            </span>
          </fieldset>
          <div className='profile__btns'>
            {initChange ? (
              <button
                className={`profile__btn profile__btn_submit button ${
                  formValid ? '' : 'profile__btn_submit_disabled'
                }`}
                type='submit'
                onClick={handleSubmit}
                disabled={!formValid || buttonDisabled}
              >
                Сохранить
              </button>
            ) : (
            <>
              <button
                className='profile__btn profile__btn_edit button'
                type='button'
                onClick={handleClickEditButton}
              >
                Редактировать
              </button>
              <Link to="/">
              <button
                className='profile__btn profile__btn_exit button'
                type='button'
                onClick={logOut}
              >
                Выйти из аккаунта
              </button>
              </Link>
            </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;