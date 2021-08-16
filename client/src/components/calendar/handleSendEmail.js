import { sendEmailForServiceBooked } from "../../apis/servicesBookedApi";

const handleSendEmail = async (showPopup, setMessage, history) => {
  const res = await sendEmailForServiceBooked({
    email: showPopup.receiverDetails.email,
    name: showPopup.receiverDetails.name,
    category: showPopup.category,
    date: showPopup.start,
    phone: showPopup.providerDetails.phone,
  });
  res ? setMessage("email send") : setMessage("email not exist");
  setTimeout(() => {
    setMessage("");
    history.push(`/dashboard`);
  }, 3000);
};

export default handleSendEmail;
