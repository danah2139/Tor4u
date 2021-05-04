import axios from "axios";
import { setUserToken, getLoggedInUserToken, removeUserToken } from "./auth";

export const testConnection = async () => {
  try {
    const res = await axios.get("/api");
    console.log(res.data);
  } catch (e) {
    console.log(e.response);
  }
};

export const createNewReceiver = async (receiver) => {
  try {
    const res = await axios.post("/api/receivers/login", receiver);
    setUserToken(res.data.token);
    return res.data.receiver._id;
  } catch (e) {
    console.log(e.response);
  }
};

export const logIn = async (receiver) => {
  try {
    const res = await axios.post("/api/receivers/login", receiver);
    return setUserToken(res.data.token);
  } catch (e) {
    console.log(e.response);
  }
};

export const getAllreceivers = async () => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get("/api/receivers", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const isReceiverLoggedIn = () => {
  const token = getLoggedInUserToken();
  if (!token) {
    return false;
  }
  return true;
};

export const getReceiver = async () => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get("/api/receivers/me", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const logout = async () => {
  try {
    const token = getLoggedInUserToken();

    if (!token) {
      return "please log in";
    }
    removeUserToken();

    const res = await axios.post("/api/receivers/logout", {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const updateReceiver = async (receiver) => {
  try {
    const token = getLoggedInUserToken();

    if (!token) {
      return "please log in";
    }

    const res = await axios.patch("/api/receivers", {
      ...receiver,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};
