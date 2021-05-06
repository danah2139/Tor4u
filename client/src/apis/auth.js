// save user token (token)
export const setUserToken = (token) => {
  localStorage.setItem("tor4u-logged-in", token);

  return true;
};

export const setUserType = (type) => {
  localStorage.setItem("userType", type);
  return true;
};
export const getUserType = () => {
  const userType = localStorage.getItem("userType");
  return userType;
};

// get logged in user token ()
export const getLoggedInUserToken = () => {
  const userToken = localStorage.getItem("tor4u-logged-in");
  return userToken;
};

// delete user token on log out ()
export const removeUserToken = () => {
  if (!localStorage.getItem("tor4u-logged-in")) {
    return false;
  }
  localStorage.removeItem("tor4u-logged-in");
  return true;
};

export const removeUserType = () => {
  if (!localStorage.getItem("userType")) {
    return false;
  }
  localStorage.removeItem("userType");
  return true;
};
