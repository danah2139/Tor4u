import { useEffect, useState } from "react";
import { getUserServiceBooked } from "../../apis/servicesBookedApi";
import { getUserType } from "../../apis/auth";
import { StyledContainer } from "./appointmentsTableStyle";
import { useTable, useSortBy } from "react-table";

const AppointmentsTable = () => {
  const [appointmentsTable, setAppointmentsTable] = useState([]);
  useEffect(() => {
    (async () => {
      let type = getUserType();
      let table = await getUserServiceBooked(type);
      setAppointmentsTable(table);
    })();
  }, []);
  const renderItem = (sortedAppointments, i) => {
    return sortedAppointments.slice(i, i + 5).map((appointment) => {
      const [month, day, hour] = JSON.stringify(appointment.start).match(
        /-[0-9][0-9]|[0-9][0-9]:[0-9][0-9]/g
      );
      const catgoryArr = appointment.category.split(/([A-Z])/);
      return (
        <tr>
          <td>{appointment.providerDetails.companyName}</td>
          <td>
            {catgoryArr[1]
              ? (
                  catgoryArr[0] +
                  " " +
                  catgoryArr[1] +
                  catgoryArr[2]
                ).toLowerCase()
              : catgoryArr[0].toLowerCase()}
          </td>
          <td>{` ${day.replace("-", "")}/${month.replace(
            "-",
            ""
          )} at ${hour}`}</td>
          <td>30 minutes</td>
        </tr>
      );
    });
  };
  const renderTable = () => {
    let currentDate = new Date();
    const sortedAppointments = appointmentsTable
      .slice()
      .sort((a, b) => new Date(a.start) - new Date(b.start));
    let index = sortedAppointments.findIndex(
      (appointment) => new Date(appointment.start) > currentDate
    );
    console.log(sortedAppointments, index);
    return (
      <table>
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
    (appointmentsTable && (
      <StyledContainer>
        <h2>Upcoming Appointments: 📋 </h2> {renderTable()}
      </StyledContainer>
    )) ||
    null
  );
};
export default AppointmentsTable;
