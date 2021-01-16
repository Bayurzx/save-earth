import { API } from '../config';

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(result => result.json())
  .catch(error => console.log(error));
};

export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const updateUserLocalStorage = (user, next) => {
  if (typeof window != "undefined") {
    if (localStorage.getItem('jwts')) {
      let auth = JSON.parse(localStorage.getItem('jwts'))
      auth.user = user
      localStorage.setItem('jwts', JSON.stringify(auth))
      next()
    }
  }
}
