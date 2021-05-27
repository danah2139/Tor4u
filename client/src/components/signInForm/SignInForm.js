import React, { useState, useRef } from "react";
import { logIn } from "../../apis/usersApi";
import { StyledForm, StyledError } from "./signInFormStyle";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { useHistory } from "react-router-dom";
import { getUserType } from "../../apis/auth";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessege, setErrorMessage] = useState("");
  const ref = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userType = await getUserType();
    console.log("user type", userType);
    let token = await logIn({ email, password }, userType);
    token ? history.push(`/dashboard`) : setErrorMessage("user not exist");
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <StyledForm onSubmit={handleSubmit} ref={ref}>
      <h3>Sign In</h3>
      <div>
        <Input
          required
          label="Email:"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <Input
          required
          label="Password:"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>

      <Button type="submit" label="Sign In" value="SIGN IN" />
      {errorMessege ? <StyledError>{errorMessege}</StyledError> : null}
    </StyledForm>
  );
};
export default SignInForm;
