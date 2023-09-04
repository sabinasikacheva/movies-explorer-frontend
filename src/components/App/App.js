import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/apiAuth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [cards, setCards] = useState([]);
  const [registerError, setRegisterError] = useState(true);
  const [loginError, setLoginError] = useState(true);
  const [profileMessage, setProfileMessage] = useState(true);
  const [resultSearchMyMovies, setResultSearchMyMovies] = useState([]);
  const [startingSearchMyPage, setStartingSearchMyPage] = useState(false);
  const savedAllMoviesLocal = localStorage.getItem('resultSearchMovies');
  const [resultSearchMovies, setResultSearchMovies] = useState(savedAllMoviesLocal ? JSON.parse(savedAllMoviesLocal) : []);
  const [errorMessageSearchForm, setErrorMessageSearchForm] = useState('Введите запрос');

  const navigate = useNavigate();

  // Получение токена
  function checkToken() {
    const token = localStorage.getItem('jwt');
    mainApi.setToken(token);
    if (token) {
      Promise.all([mainApi.getCurrentUser(), mainApi.getCards()]).then(([userData, card]) => {
        setCurrentUser(userData);
        setCards(card);
        setLoggedIn(true);
      })
        .catch((err) => {
          setLoggedIn(false);
          logOut();
          if (err === 'Ошибка: 401') {
            setLoginError(
              'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
            );
          }
          if (err === 'Ошибка: 403') {
            setLoginError(
              'При авторизации произошла ошибка. Переданный токен некорректен.'
            );
          }
        });
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  // Регистрация пользователя
  function handleRegister(regData) {
    const email = regData.email;
    const password = regData.password;
    apiAuth
      .register(regData)
      .then((res) => {
        handleLogin({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === 'Ошибка: 409') {
          setRegisterError('Пользователь с таким email уже существует');
        }
        if (err === 'Ошибка: 500') {
          setRegisterError('На сервере произошла ошибка');
        }
      });
  }

  // Авторизация пользователя
  function handleLogin(loginData) {
    apiAuth
      .login(loginData)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === 'Ошибка: 401') {
          setLoginError('Вы ввели неправильный логин или пароль');
        }
        if (err === 'Ошибка: 500') {
          setLoginError('На сервере произошла ошибка');
        }
      });
  }

  // Выйти из аккаунта
  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
    mainApi.setToken('');
    console.log('Выход');
  }

  // Изменение данных пользователя
  function handleUpdateUser(userData) {
    mainApi
      .updateUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setProfileMessage('Данные успешно обновлены');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setProfileMessage('Пользователь с таким email уже существует');
        } else {
          setProfileMessage('При обновлении профиля произошла ошибка');
        }
      });
  }

  // Сохранение фильма
  const saveMovies = (movieData) => {
    mainApi.saveMovie(movieData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        console.log('Карточка создана:', movieData);
      })
      .catch((error) => {
        console.log('Ошибка при создании карточки:', error);
      });
  };

  // Удаление фильма
  function deleteMovies(card) {
    mainApi.deleteMovie(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.error(err);
    });
  }

  // Защита навигации на /signin и /signup для авторизированного пользователя
  const navigateAutorizedUser = () => {
    const isSigninPage = window.location.pathname === "/signin";
    const isSignupPage = window.location.pathname === "/signup";

    if ((isSigninPage || isSignupPage) && loggedIn) {
      return navigate("/");
    }
    return;
  }

  useEffect(() => {
    navigateAutorizedUser();
  }, [])

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route
          path='/movies'
          element={<ProtectedRoute
          element={Movies}
          loggedIn={loggedIn}
          saveMovies={saveMovies}
          deleteMovies={deleteMovies}
          cards={cards}
          resultSearchMovies={resultSearchMovies}
          setResultSearchMovies={setResultSearchMovies}
          setStartingSearchMyPage={setStartingSearchMyPage}
          errorMessageSearchForm={errorMessageSearchForm}
          setErrorMessageSearchForm={setErrorMessageSearchForm}
          />}
        />
        <Route
          path='/saved-movies'
          element={<ProtectedRoute
          element={SavedMovies}
          loggedIn={loggedIn}
          deleteMovies={deleteMovies}
          cards={cards}
          setCards={setCards}
          resultSearchMyMovies={resultSearchMyMovies}
          setResultSearchMyMovies={setResultSearchMyMovies}
          setStartingSearchMyPage={setStartingSearchMyPage}
          startingSearchMyPage={startingSearchMyPage}
          errorMessageSearchForm={errorMessageSearchForm}
          setErrorMessageSearchForm={setErrorMessageSearchForm}
        />}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              logOut={logOut}
              profileMessage={profileMessage}
            />
          }
        />
        <Route
          path='/signin'
          element={<Login onLogin={handleLogin} loginError={loginError} />}
        />
        <Route
          path='/signup'
          element={
            <Register
              onRegister={handleRegister}
              registerError={registerError}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  </CurrentUserContext.Provider>
);
}

export default App;