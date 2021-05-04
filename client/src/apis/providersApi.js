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

export const createNewProvider = async (provider) => {
  try {
    const res = await axios.post("/api/providers/login", provider);
    setUserToken(res.data.token);
    return res.data.provider._id;
  } catch (e) {
    console.log(e.response);
  }
};

export const logIn = async (provider) => {
  try {
    const res = await axios.post("/api/providers/login", provider);
    return setUserToken(res.data.token);
  } catch (e) {
    console.log(e.response);
  }
};

export const getAllProviders = async () => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get("/api/providers", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const isProviderLoggedIn = () => {
  const token = getLoggedInUserToken();
  if (!token) {
    return false;
  }
  return true;
};

export const getProvider = async () => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.get("/api/providers/me", {
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

    const res = await axios.post("/api/providers/logout", {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const updateProvider = async (user) => {
  try {
    const token = getLoggedInUserToken();

    if (!token) {
      return "please log in";
    }

    const res = await axios.patch("/api/providers", {
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
