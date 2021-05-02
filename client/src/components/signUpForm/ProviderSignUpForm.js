import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { createNewUser } from "../../apis/usersApi";
// import { getLoggedInUserToken } from "../../apis/auth";
import { StyledForm } from "./signUpFormStyle";
import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";

const ProviderSignUpForm = ({ userType }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await createNewUser({ name, email, userId, password });
    history.push(`/${userType}/dashboard`);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <Input
        required
        label="Company Name:"
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <Select label="Category:" />
      <Input
        required
        label="Price:"
        name="price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <Button type="submit" label="Sign Up" />
    </StyledForm>
  );
};
export default ProviderSignUpForm;
