import { StyledContainer, StyledMessage } from "./AppointmentDetailPopupStyle";
import Button from "../utils/Button";
const AppointmentDetailPopup = ({
  appointment,
  sendEmail,
  message,
  closePopUp,
}) => {
  return (
    <StyledContainer>
      <div className="popup_inner">
        <h1>TOR4U - {appointment.category}</h1>
        <p>
          `An appointment has been made for you to $
          {appointment.providerDetails.companyName} at $
          {appointment.providerDetails.address} a cell phone number to contact $
          {appointment.providerDetails.phone}
          price per half hour ${appointment.providerDetails.price}`
        </p>
        <Button onClick={sendEmail} label="Send Mail" />
        <Button onClick={closePopUp} label="Close" />
      </div>
      {message ? <StyledMessage>{message}</StyledMessage> : null}
    </StyledContainer>
  );
};

export default AppointmentDetailPopup;
