import axios from "axios";
import {
  setUserToken,
  getLoggedInUserToken,
  removeUserToken,
  removeUserType,
} from "./auth";

export const createNewUser = async (user, type) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/${type}s/signup`,
      user
    );
    setUserToken(res.data.token, type);
    // console.log(res.data[type]._id);
    return res.data[type]._id;
  } catch (e) {
    console.log(e.response);
  }
};

export const logIn = async (user, type) => {
  try {
    // console.log(user);
    const res = await axios.post(
      `http://localhost:5000/api/${type}s/login`,
      user
    );
    // console.log("login", res);
    return setUserToken(res.data.token);
  } catch (e) {
    console.log(e.response);
  }
};

export const getAllUsers = async (type) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get(`http://localhost:5000/api/${type}s`, {
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
    // console.log(type);
    const res = await axios.get(`http://localhost:5000/api/${type}s/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res);
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const logout = async (type) => {
  try {
    const token = getLoggedInUserToken();
    console.log(type);
    if (!token) {
      return "please log in";
    }

    const res = await axios.post(`http://localhost:5000/api/${type}s/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    removeUserToken();

    removeUserType();

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const updateUser = async (user, type) => {
  try {
    const token = getLoggedInUserToken();
    console.log(user);
    if (!token) {
      return "please log in";
    }

    const res = await axios.patch(`http://localhost:5000/api/${type}s/me`, {
      user,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log('res',res);

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};
