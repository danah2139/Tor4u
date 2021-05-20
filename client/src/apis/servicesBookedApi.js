import API from "./API";
import { getLoggedInUserToken } from "./auth";

export const createNewServiceBooked = async (serviceBooked) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    const res = await API.post("/servicesBooked", serviceBooked, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const sendEmailForServiceBooked = async (serviceBooked) => {
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    console.log(serviceBooked);
    const res = await API.post("/servicesBooked/email", serviceBooked, {
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
export const getUserServiceBooked = async (type) => {
  // console.log(id);
  try {
    const token = getLoggedInUserToken();
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await API.get(`/${type}s/servicesBooked`, {
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

export const getAllProviderServiceBooked = async (providerId) => {
  // console.log(id);
  try {
    const token = getLoggedInUserToken();
    //console.log("id", providerId);
    if (!token) {
      return "please log in";
    }
    // console.log(token);
    const res = await API.get(`/servicesBooked/provider/${providerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const res = await API.get(`/servicesBooked/${serviceBookedId}`, {
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
    const res = await API.delete(`/servicesBooked/${serviceBookedId}`, {
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
