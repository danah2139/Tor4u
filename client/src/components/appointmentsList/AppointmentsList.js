import { useEffect, useState } from "react";
import { getUserServiceBooked } from "../../apis/servicesBookedApi";
import { getUserType } from "../../apis/auth";
import { StyledContainer } from "./appointmentsListStyle";
import { useTable, useSortBy } from "react-table";

const AppointmentsList = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  useEffect(() => {
    (async () => {
      let type = getUserType();
      let list = await getUserServiceBooked(type);
      setAppointmentsList(list);
    })();
  }, []);
  const renderItem = (sortedAppointments, i) => {
    // const [month, day, hour] = JSON.stringify(appointment.start).match(
    //   /-[0-9][0-9]|[0-9][0-9]:[0-9][0-9]/g
    // );
    // const catgoryArr = appointment.category.split(/([A-Z])/);

    return sortedAppointments.slice(i, i + 5).map((appointment) => (
      <tr>
        <td>{appointment.providerDetails.companyName}</td>
        <td>{appointment.category}</td>
        <td>{appointment.start}</td>
        <td>30 minutes</td>
      </tr>
    ));
  };
  const renderList = () => {
    let currentDate = new Date();
    const sortedAppointments = appointmentsList
      .slice()
      .sort((a, b) => new Date(b.start) - new Date(a.start));
    let index = sortedAppointments.findIndex(
      (appointment) => new Date(appointment.start) < currentDate
    );
    console.log(sortedAppointments, index);
    return (
      <table style={{ border: "solid 1px black" }}>
        {" "}
        <thead>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Duration</th>
        </thead>
        <tbody>{renderItem(sortedAppointments, index)}</tbody>
      </table>
    );
  };
  return (
    (appointmentsList && (
      <StyledContainer>
        <h2>Recents Appointments:</h2> {renderList()}
      </StyledContainer>
    )) ||
    null
  );
};
export default AppointmentsList;
