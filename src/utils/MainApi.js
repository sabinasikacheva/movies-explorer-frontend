class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
}

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }
  
// Загрузить данные пользователя с сервера
  getCurrentUser() {
    return fetch(`${this._url}/users/me`, { 
      headers: this._headers })
      .then(this._getJson)
  }

  // Редактировать профиль пользователя
  updateUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, email })
      })
      .then(this._getJson)
  }
  
 // Получить все карточки
 getCards() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers
    }) 
      .then(this._getJson)
  }

// Сохранить карточку
  saveMovie(item) {
    return fetch(`${this._url}/movies`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(item)
      })
      .then(this._getJson)
  }

// Удалить карточку
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._getJson)
  }
}
  
const mainApi = new MainApi({
  // url: 'http://localhost:3000',
  url: 'https://api.diploma.sikacheva.nomoredomains.work',
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
});
  
export default mainApi;