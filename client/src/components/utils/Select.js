import { StyledContainer, StyledLabel } from "./utilsStyle";
const Select = ({
  label,
  name,
  onChange,
  value,
  required,
  type = "text",
  autoFocus,
}) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <select name={name} onChange={onChange} value={value}>
        <option>Choose Category</option>
      </select>
    </StyledContainer>
  );
};
export default Select;
