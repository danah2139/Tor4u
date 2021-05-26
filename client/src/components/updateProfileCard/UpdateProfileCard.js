import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StyledForm, StyledWrapper } from "./updateProfileCardStyle";
import { getUserType } from "../../apis/auth";
import { updateUser, getUser } from "../../apis/usersApi";

import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";
const UpdateProfileCard = () => {
  const history = useHistory();
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("");
  const [receiver, setReceiver] = useState("");
  let data;
  let userType;
  useEffect(() => {
    (async () => {
      setType(getUserType());
      //console.log("user type", type);
      if (type) {
        let userDetails = await getUser(type);
        delete userDetails["_id"];
        delete userDetails["__v"];
        if (type === "provider") {
          console.log(userDetails);
          setProvider(userDetails);
        } else {
          setReceiver(userDetails);
        }
      }
    })();
  }, [type]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    if (type === "provider") {
      Object.entries(provider).forEach((value) => {
        if (value[1]) fd.append(value[0], value[1]);
      });
    } else {
      Object.entries(receiver).forEach((value) => {
        console.log(value, "value");
        if (value[1]) fd.append(value[0], value[1]);
      });

      //fd.append("avatar", receiver.avatar);
    }
    console.log(fd, "fd");
    data = await updateUser(fd, type);
    if (data) {
      history.push(`/dashboard`);
    }
    //
  };

  const handleChange = (e) => {
    //console.log(e.target, "avatar");

    if (type === "provider") {
      e.target.name === "avatar"
        ? setProvider({ ...provider, [e.target.name]: e.target.files[0] })
        : setProvider({ ...provider, [e.target.name]: e.target.value });
    } else {
      e.target.name === "avatar"
        ? setReceiver({ ...receiver, [e.target.name]: e.target.files[0] })
        : setReceiver({ ...receiver, [e.target.name]: e.target.value });
    }
  };
  return (
    <StyledWrapper>
      {" "}
      {type && (provider || receiver) && (
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
            label="Upload Image: "
            name="avatar"
            type="file"
            onChange={handleChange}
          />

          {type === "provider" && (
            <Select
              label="Category:"
              value={provider["category"]}
              onChange={(catagory) => {
                setProvider({ ...provider, ["category"]: catagory });
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
      )}
    </StyledWrapper>
  );
};
export default UpdateProfileCard;
