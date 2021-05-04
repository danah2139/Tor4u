import axios from "axios";
import { setUserToken, getLoggedInUserToken, removeUserToken } from "./auth";

export const createNewUser = async (user, type) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/${type}s/signup`,
      user
    );
    setUserToken(res.data.token);
    console.log(res);
    return res.data[type]._id;
  } catch (e) {
    console.log(e.response);
  }
};

export const logIn = async (user, type) => {
  try {
    const res = await axios.post(`/api/${type}s/login`, user);
    return setUserToken(res.data.token);
  } catch (e) {
    console.log(e.response);
  }
};

export const getAllusers = async (type) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get(`/api/${type}s`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const isUserLoggedIn = () => {
  const token = getLoggedInUserToken();
  if (!token) {
    return false;
  }
  return true;
};

export const getUser = async (type) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get(`/api/${type}s/me`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const logout = async (type) => {
  try {
    const token = getLoggedInUserToken();

    if (!token) {
      return "please log in";
    }
    removeUserToken();

    const res = await axios.post(`/api/${type}s/logout`, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const updateUser = async (user, type) => {
  try {
    const token = getLoggedInUserToken();

    if (!token) {
      return "please log in";
    }

    const res = await axios.patch(`/api/${type}s`, {
      ...user,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};
