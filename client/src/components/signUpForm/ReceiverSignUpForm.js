import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewUser } from "../../apis/usersApi";
import { StyledForm, StyledError } from "./signUpFormStyle";
import Button from "../utils/Button";
import Input from "../utils/Input";

const ReceiverSignUpForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessege, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await createNewUser(
      { name, email, phone, password, address },
      "receiver"
    );
    console.log(res.data);
    res._id ? history.push(`/dashboard`) : setErrorMessage(res.data.message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <Input
        required
        label="Name:"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
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
        label="Phone:"
        name="phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        value={phone}
      />
      <Input
        required
        label="Address:"
        name="address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        value={address}
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

      <Button type="submit" label="Sign Up" value="SIGN UP" />
      {errorMessege ? <StyledError>{errorMessege}</StyledError> : null}
    </StyledForm>
  );
};
export default ReceiverSignUpForm;
