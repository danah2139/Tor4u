import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../apis/usersApi";
import { getUserType } from "../../apis/auth";
import Button from "../utils/Button";

const Logout = () => {
  const history = useHistory();

  const logoutUser = async () => {
    let type = await getUserType();
    await logout(type);

    history.push("/");
  };

  const renderLogout = () => {
    return (
      <Button
        label="log out"
        onClick={logoutUser}
        color="red"
        value="LOG OUT"
      />
    );
  };
  return renderLogout();
};
export default Logout;
