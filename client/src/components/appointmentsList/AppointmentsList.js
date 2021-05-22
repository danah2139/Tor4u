import { useEffect, useState } from "react";
import { getUserServiceBooked } from "../../apis/servicesBookedApi";
import { getUserType } from "../../apis/auth";
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
  const renderList = () => {
    let currentDate = new Date();
    const sortedAppointments = appointmentsList
      .slice()
      .sort((a, b) => b.start - a.start);
    console.log(sortedAppointments);
    return (
      <table style={{ border: "solid 1px black" }}>
        {" "}
        <thead>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
        </thead>
        <tbody></tbody>
      </table>
    );
  };
  return (
    (appointmentsList && <div>Recents Appointments: {renderList()}</div>) ||
    null
  );
};
export default AppointmentsList;
