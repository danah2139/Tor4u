import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    let didCancel = false;
    (async () => {
      const res = await getAllUsers("provider");

      if (!didCancel) {
        setProviders(res);
      }
    })();
  }, []);

  const bookedProvider = (e) => {};

  const renderItem = (provider) => {
    const tempArr = [];
    for (let key in provider) {
      if (key !== "_id" && key !== "password") {
        tempArr.push(<div>{provider[key]}</div>);
      }
    }

    return tempArr;
  };

  const renderList = () => {
    if (providers) {
      return providers
        .filter((provider) => provider.category === selectedCategory)
        .map((provider) => {
          return (
            <StyledListItem key={provider._id} onClick={bookedProvider}>
              {renderItem()}
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
