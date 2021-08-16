import { createNewServiceBooked } from "../../apis/servicesBookedApi";

const handleAddAppointamnet = async (
  addInfo,
  setShowPopup,
  providerDetails,
  receiverDetails,
  id
) => {
  try {
    console.log(addInfo);
    let appointment = {
      provider: id,
      category: providerDetails.category,
      price: providerDetails.price,
      start: addInfo.event.start,
      end: addInfo.event.end,
      receiverDetails: {
        email: receiverDetails.email,
        phone: receiverDetails.phone,
        address: receiverDetails.address,
        name: receiverDetails.name,
      },
      providerDetails: {
        phone: providerDetails.phone,
        address: providerDetails.address,
        companyName: providerDetails.companyName,
      },
    };
    let response = await createNewServiceBooked(appointment);
    console.log("response", response);
    if (response) {
      setShowPopup(appointment);
    }
  } catch (e) {
    console.log(e);
    addInfo.revert();
  }
};

export default handleAddAppointamnet;
