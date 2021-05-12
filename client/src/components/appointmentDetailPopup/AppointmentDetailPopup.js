import { StyledContainer } from "./AppointmentDetailPopupStyle";

const AppointmentDetailPopup = (props) => {
  return (
    <StyledContainer>
      <div className="popup_inner">
        <h1>{props.text}</h1>
        <button onClick={props.closePopup}>send mail</button>
      </div>
    </StyledContainer>
  );
};

export default AppointmentDetailPopup;
