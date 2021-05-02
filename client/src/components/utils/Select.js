import { StyledContainer, StyledLabel } from "./utilsStyle";
const Select = ({
  label,
  name,
  onChange,
  required,
  type = "text",
  autoFocus,
}) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <select name={name} onChange={onChange}>
        <option>Choose Category</option>
        <option value="manicure">Manicure</option>
        <option value="plumbing">Plumbing</option>
        <option value="hairDesign">Hair Design</option>
        <option value="makeup">Makeup</option>
      </select>
    </StyledContainer>
  );
};
export default Select;
