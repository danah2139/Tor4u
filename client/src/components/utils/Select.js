import { StyledContainer, StyledLabel, StyledSelect } from "./utilsStyle";
const Select = ({ label, onChange }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect onChange={(event) => onChange(event.target.value)}>
        <option>Choose Category</option>
        <option value="manicure">Manicure</option>
        <option value="plumbing">Plumbing</option>
        <option value="hairDesign">Hair Design</option>
        <option value="makeup">Makeup</option>
        <option value="cleaningServices">Cleaning Services</option>
      </StyledSelect>
    </StyledContainer>
  );
};
export default Select;
