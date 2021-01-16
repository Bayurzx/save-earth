import { API } from '../config';

export const signup = (user) => {

  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(result => result.json())
  .catch(error => console.log(error))
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(result => result.json())
  .catch(error => console.log(error))
};

export const authenticate = (data, next) => {
  if (typeof window != undefined) {
    localStorage.setItem('jwts', JSON.stringify(data))
    next();
  }
}

// note that signout takes a callback function in Menu.js [24:113]
export const signout = (next) => {
  if (typeof window != undefined) {
    localStorage.removeItem('jwts')
    next();

    fetch(`$${API}/signout`, {
      method: "GET"
    })
    .then(response => console.log("You signed out", response))
    .catch(error => console.log(error))
  }
}

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false
  }
  if (localStorage.getItem('jwts')) {
    return JSON.parse(localStorage.getItem('jwts'));
  } else {
    return false
  }
}
