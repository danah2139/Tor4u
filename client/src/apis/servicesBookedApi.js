import axios from "axios";
import { getLoggedInUserToken } from "./auth";

export const createNewServiceBooked = async (serviceBooked) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.post(
      "http://localhost:5000/api/servicesBooked",
      serviceBooked,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

// get receiever ServicesBooked
export const getUserServiceBooked = async (type) => {
  // console.log(id);
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.get(
      `http://localhost:5000/api/${type}s/servicesBooked`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllProviderServiceBooked = async (id) => {
  // console.log(id);
  try {
    const token = getLoggedInUserToken();
    console.log("id", id);
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.get(
      `http://localhost:5000/api/servicesBooked/provider`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e.response);
  }
};

export const getServiceBooked = async (serviceBookedId) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.get(
      `http://localhost:5000/api/servicesBooked/${serviceBookedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteServiceBooked = async (serviceBookedId) => {
  // console.log(serviceBookedId);
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.delete(
      `http://localhost:5000/api/servicesBooked/${serviceBookedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
