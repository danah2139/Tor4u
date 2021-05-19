import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  StyledContainerColumn,
  StyledHeader,
  StyledListItem,
  StyledWarning,
} from "./providersListStyle";
import { getAllUsers } from "../../apis/usersApi";
// import AddNewprovider from "./AddNewprovider";
import Button from "../utils/Button";
import Select from "../utils/Select";
const ProvidersList = () => {
  const [showAddNew, setShowAddNew] = useState(true);
  const [providers, setProviders] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useHistory();
  useEffect(() => {
    let didCancel = false;
    (async () => {
      const res = await getAllUsers("provider");
      console.log("providres:".res);
      if (!didCancel) {
        setProviders(res);
      }
    })();
  }, []);

  const bookedProvider = (id) => {
    history.push(`/calendar/${id}`);
  };

  const renderItem = (provider) => {
    const tempArr = [];

    for (let key in provider) {
      if (
        key !== "_id" &&
        key !== "password" &&
        key !== "__v" &&
        key !== "category" &&
        key !== "avatar"
      ) {
        tempArr.push(
          <div>
            <span className="title">{key} : </span>
            <span>{provider[key]}</span>
          </div>
        );
      }
    }

    let srcLink = provider.avatar
      ? `data:image/png;base64, ${provider["avatar"]}`
      : "./avatar.jpg";

    tempArr.push(<img src={srcLink} alt="img" />);

    return tempArr;
  };

  const renderList = () => {
    if (providers) {
      return providers
        .filter((provider) => provider.category === selectedCategory)
        .map((provider) => {
          return (
            <StyledListItem
              key={provider._id}
              onClick={() => bookedProvider(provider._id)}
            >
              {renderItem(provider)}
            </StyledListItem>
          );
        });
    }
  };

  return (
    <StyledContainerColumn>
      <StyledHeader>Providers</StyledHeader>
      <Select
        label="Catagories:"
        onChange={(value) => setSelectedCategory(value)}
      />
      {/* <Button
        label={showAddNew ? "Close" : "Add"}
        onClick={() => setShowAddNew(!showAddNew)}
      /> */}
      {/* {showAddNew ? <AddNewprovider handleSubmit={handleSubmit} /> : null}
      {warning ? <StyledWarning>{warning}</StyledWarning> : null} */}

      <ul>{renderList()}</ul>
    </StyledContainerColumn>
  );
};
export default ProvidersList;
