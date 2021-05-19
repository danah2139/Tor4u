import { useEffect, useState } from "react";
import { getUserType } from "../../apis/auth";
import { getUser } from "../../apis/usersApi";
import AppointmentsList from "../appointmentsList/AppointmentsList";
import { StyledColumn, StyledContainer } from "./profileCardStyle";
const ProfileCard = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    (async () => {
      const userType = await getUserType();
      const user = await getUser(userType);
      setUser(user);
      // console.log(user);
    })();
  }, []);
  const renderUser = () => {
    let tempUserArr = [];
    if (user) {
      let srcLink = user.avatar
        ? `data:image/png;base64, ${user["avatar"]}`
        : "./avatar.jpg";

      tempUserArr.push(<img src={srcLink} alt="img" />);
      for (let key in user) {
        if (key !== "_id" && key !== "__v" && user[key] !== []) {
          tempUserArr.push(
            <div>
              <span className="title">{key.toUpperCase()} : </span>
              <span>{user[key]}</span>
            </div>
          );
        }
      }
      //console.log(user.avatar.buffer);
      return tempUserArr;
    }
    return <div>user not exist</div>;
  };
  return (
    <StyledContainer>
      <StyledColumn>{renderUser()}</StyledColumn>
      <AppointmentsList />
    </StyledContainer>
  );
};
export default ProfileCard;
