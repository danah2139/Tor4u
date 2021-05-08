import Calendar from "../calendar/Calendar";
import Select from "../utils/Select";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { StyledContainer, StyledContainerColumn } from "./addCategoryStyle";
import { updateUser } from "../../apis/usersApi";
import { useState } from "react";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const handleAddCategoryClick = () => {
    setCategory({ category: selectCategory, price: Number(inputPrice) });
    console.log(category);
    updateUser(category, "provider");
  };
  return (
    <StyledContainer>
      <StyledContainerColumn>
        <Select
          onChange={(value) => setSelectCategory(value)}
          label="Choose Category :"
        />
        <Input
          label="Price :"
          type="Number"
          onChange={(e) => {
            setInputPrice(e.target.value);
          }}
        />
      </StyledContainerColumn>

      <Calendar />
      <Button label="add Category" onClick={handleAddCategoryClick} />
    </StyledContainer>
  );
};
export default AddCategory;
