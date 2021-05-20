import { StyledContainer, StyledMessage } from "./AppointmentDetailPopupStyle";
import Button from "../utils/Button";
const AppointmentDetailPopup = (props) => {
  return (
    <StyledContainer>
      <div className="popup_inner">
        <h1>TOR4U - {props.appointment.category}</h1>
        <p>
          `An appointment has been made for you to $
          {providerDetails.companyName} at ${providerDetails.address} a cell
          phone number to contact ${providerDetails.phone}
          price per half hour ${providerDetails.price}`
        </p>
        <Button onClick={props.sendEmail} label="Send Mail" />
        <Button onClick={props.closePopUp} label="Close" />
      </div>
      {pops.message ? <StyledMessage>{message}</StyledMessage> : null}
    </StyledContainer>
  );
};

export default AppointmentDetailPopup;
