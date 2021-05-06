import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewUser } from "../../apis/usersApi";
import { StyledForm } from "./signUpFormStyle";
import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";

const ProviderSignUpForm = () => {
  const history = useHistory();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  // const [detailService, setDetailService] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewUser(
      { companyName, email, phone, password, address },
      "provider"
    );
    history.push(`/dashboard`);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <Input
        required
        label="Company Name:"
        name="companyName"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
        value={companyName}
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
      {/* <Select
        label="Category:"
        name="category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <Input
        required
        label="Price:"
        name="price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <button
        onClick={() => {
          setDetailService([...detailService, { category, price }]);
        }}
      >
        Add
      </button> */}

      <Button type="submit" label="Sign Up" value="SIGN UP" />
    </StyledForm>
  );
};
export default ProviderSignUpForm;
