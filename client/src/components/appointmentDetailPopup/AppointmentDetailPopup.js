import { StyledContainer, StyledMessage } from "./AppointmentDetailPopupStyle";
import Button from "../utils/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekelSign } from "@fortawesome/free-solid-svg-icons";

const AppointmentDetailPopup = ({
  appointment,
  sendEmail,
  message,
  closePopUp,
}) => {
  const [month, day, hour] = JSON.stringify(appointment.start).match(
    /-[0-9][0-9]|[0-9][0-9]:[0-9][0-9]/g
  );
  console.log(day);
  return (
    <StyledContainer>
      <div className="popup_inner">
        <h1>TOR4U - {appointment.category}</h1>
        <p>
          An appointment has been made for you to{" "}
          <span>{appointment.providerDetails.companyName}</span> <br />
          at <span>{appointment.providerDetails.address}</span>,<br />
          cell phone number to contact{" "}
          <span>{appointment.providerDetails.phone}</span>, <br />
          cost per half hour <span>{appointment.price}</span>{" "}
          <FontAwesomeIcon icon={faShekelSign} />
        </p>
        <h5>
          On {day.replace("-", "")} / {month.replace("-", "")} at {hour}
        </h5>
        <div className="buttons-container">
          {" "}
          <Button onClick={sendEmail} label="Send Mail" />
          <Button onClick={closePopUp} label="Close" />
        </div>
      </div>
      {message ? <StyledMessage>{message}</StyledMessage> : null}
    </StyledContainer>
  );
};

export default AppointmentDetailPopup;
