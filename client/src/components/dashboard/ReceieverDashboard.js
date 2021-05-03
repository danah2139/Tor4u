import React, { useEffect, useState } from "react";
import { StyledContainer } from "./dashboardStyle";
import ProviderList from "../providerList/ProviderList";
import {
  createNewClassroom,
  getUsersClassrooms,
} from "../../../apis/classroomsApi";
import ClassroomCard from "./ClassroomCard";

const RecieverDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [warning, setWarning] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    let didCancel = false;
    const fetchClasses = async () => {
      const res = await getUsersClassrooms();
      if (!didCancel) {
        setClassrooms(res);
      }
    };
    fetchClasses();
    return () => {
      didCancel = true;
    };
  }, []);

  const handleSubmit = async (classroom) => {
    const classRes = await createNewClassroom(classroom);

    if (classRes) {
      const res = await getUsersClassrooms();
      setClassrooms(res);
    } else {
      setWarning("This subject is already in the list. Try a different name.");
      setTimeout(() => {
        setWarning("");
      }, 3000);
    }
  };

  const displayClassroom = (e) => {
    setClassId(e.target.id);
  };

  return (
    <StyledContainer>
      <ProviderList
        classrooms={classrooms}
        displayClassroom={displayClassroom}
        handleSubmit={handleSubmit}
        warning={warning}
      />

      {classId ? (
        <ClassroomCard classId={classId} setClassId={setClassId} />
      ) : null}
    </StyledContainer>
  );
};
export default RecieverDashboard;
