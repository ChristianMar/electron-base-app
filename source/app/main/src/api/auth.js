import { AUTH_URLS as URL } from './endpoints';

export const Logout = (axios, data) => {
  // axios.get("", {});
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({});
    }, 300);
  });
};

export const Login = (axios, data) => {
  // axios.post("", {}, { withCredentials: true });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        language: 'it',
        token: 'aaaaa',
      });
    }, 300);
  });
};
