import axios from "axios";
import { getLoggedInUserToken } from "./auth";

export const createNewServiceBooked = async (serviceBooked) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await axios.post("/api/servicesBooked", serviceBooked, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

// get receiever ServicesBooked
export const getReceiverServiceBooked = async () => {
  // console.log(id);
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.get("/api/servicesBooked", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getServiceBooked = async (serviceBookedId) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await axios.get(`/api/servicesBooked/${serviceBookedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const res = await axios.delete(`/api/servicesBooked/${serviceBookedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
