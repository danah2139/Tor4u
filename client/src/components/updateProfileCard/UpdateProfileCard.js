import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StyledForm } from "./updateProfileCardStyle";
import { getUserType } from "../../apis/auth";
import { updateUser, getUser } from "../../apis/usersApi";

import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";
const UpdateProfileCard = () => {
  const history = useHistory();
  const [type, setType] = useState(null);
  //   const [companyName, setCompanyName] = useState("");
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("");
  const [receiver, setReceiver] = useState("");
  let data;
  useEffect(() => {
    (async () => {
      let userType = getUserType();
      setType(userType);
      console.log("user type", type);
      if (type) {
        let userDetails = await getUser(type);
        delete userDetails["_id"];
        delete userDetails["__v"];
        if (type === "provider") {
          setProvider(userDetails);
        } else {
          setReceiver(userDetails);
        }
      }
    })(type);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "provider") {
      data = await updateUser(provider, "provider");
    } else {
      data = await updateUser(receiver, "receiver");
    }
    if (data) {
      history.push(`/dashboard`);
    }
    //
  };

  const handleChange = (e) => {
    if (type === "provider") {
      setProvider({ ...provider, [e.target.name]: e.target.value });
    } else {
      setReceiver({ ...receiver, [e.target.name]: e.target.value });
    }
  };
  return (
    type &&
    (provider || receiver) && (
      <StyledForm onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        {type === "provider" ? (
          <Input
            required
            label="Company Name:"
            name="companyName"
            onChange={(e) => {
              setProvider({ ...provider, [e.target.name]: e.target.value });
            }}
            value={provider["companyName"]}
          />
        ) : (
          <Input
            required
            label="Name:"
            name="name"
            onChange={handleChange}
            value={receiver["name"]}
          />
        )}
        <Input
          required
          label="Email:"
          name="email"
          onChange={handleChange}
          value={type === "provider" ? provider["email"] : receiver["email"]}
        />
        <Input
          required
          label="Phone:"
          name="phone"
          onChange={handleChange}
          value={type === "provider" ? provider["phone"] : receiver["phone"]}
        />
        <Input
          required
          label="Address:"
          name="address"
          onChange={handleChange}
          value={
            type === "provider" ? provider["address"] : receiver["address"]
          }
        />
        <Input
          required
          label="Password:"
          name="password"
          onChange={handleChange}
          value={
            type === "provider" ? provider["password"] : receiver["password"]
          }
        />
        {type === "provider" && (
          <Select
            label="Category:"
            value={provider["category"]}
            onChange={(value) => {
              setProvider({ ...provider, ["category"]: value });
            }}
          />
        )}
        {type === "provider" && (
          <Input
            required
            label="Price:"
            name="price"
            onChange={(e) => {
              setProvider({ ...provider, [e.target.name]: e.target.value });
            }}
            value={provider["price"]}
          />
        )}
        <Button type="submit" label="Update" value="Update" />
      </StyledForm>
    )
  );
};
export default UpdateProfileCard;
