import { useEffect, useState } from "react";
import { getUserType } from "../../apis/auth";
import { getUser } from "../../apis/usersApi";
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
        let title = key === "companyName" ? "company name" : key;
        let value = user[key];
        if (
          key !== "_id" &&
          key !== "__v" &&
          user[key] !== [] &&
          key !== "avatar"
        ) {
          if (key === "category") {
            const catgoryArr = user.category.split(/([A-Z])/);
            console.log(catgoryArr);
            value = catgoryArr[1]
              ? (
                  catgoryArr[0] +
                  " " +
                  catgoryArr[1] +
                  catgoryArr[2]
                ).toLowerCase()
              : catgoryArr[0];
          }

          tempUserArr.push(
            <div>
              <span className="title">{title.toUpperCase()} : </span>
              <span>{value}</span>
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
    </StyledContainer>
  );
};
export default ProfileCard;
