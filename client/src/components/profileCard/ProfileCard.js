import { useEffect, useState } from "react";
import { getUserType } from "../../apis/auth";
import { getUser } from "../../apis/usersApi";
import { StyledContainer } from "./profileCardStyle";
const ProfileCard = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    (async () => {
      const userType = await getUserType();
      const user = await getUser(userType);
      setUser(user);
      console.log(user);
    })();
  }, []);
  const renderUser = () => {
    let tempUserArr = [];
    if (user) {
      for (let key in user) {
        if (key === "avatar") {
          tempUserArr.push(<img src={user["avatar"].buffer} alt="img" />);
        } else if (key !== "_id" && key !== "__v" && user[key] !== []) {
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
  return <StyledContainer>{renderUser()}</StyledContainer>;
};
export default ProfileCard;
