import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getUserType } from "../../apis/auth";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import {
  getAllProviderServiceBooked,
  getUserServiceBooked,
} from "../../apis/servicesBookedApi";
import handleSendEmail from "./handleSendEmail";
import handleAddAppointamnet from "./handleAddAppointamnet";
import { getUser, getProvider } from "../../apis/usersApi";
import { StyledContainer } from "./calendarStyle";
import AppointmentDetailPopup from "../appointmentDetailPopup/AppointmentDetailPopup";

const Calendar = () => {
  const [providerDetails, setProviderDetails] = useState("");
  const [receiverDetails, setReceiverDetails] = useState("");
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState("");
  const [message, setMessage] = useState("");
  const ref = useRef();
  const { id } = useParams();
  const history = useHistory();

  const getAllProvidersAppointments = async (id) => {
    let provider = await getProvider(id);
    setProviderDetails(provider);
    let receiver = await getUser("receiver");
    setReceiverDetails(receiver);

    let providersEvents = await getAllProviderServiceBooked(id);
    let tempArr = providersEvents.map((event) => ({
      start: event.start,
      end: event.end,
      title: "Not Available",
    }));
    let tempEvent = {
      events: tempArr,
      color: "#E42645",
      textColor: "white",
    };
    setEvents((prevState) => {
      return [...prevState, tempEvent];
    });
  };

  useEffect(() => {
    (async () => {
      const type = await getUserType();
      let otherUserType = type === "provider" ? "receiver" : "provider";
      let userEvents = await getUserServiceBooked(type);
      let userDetailsField = otherUserType + "Details";
      let nameField = otherUserType === "provider" ? "companyName" : "name";
      if (userEvents) {
        let tempArr = userEvents.map((event) => ({
          start: event.start,
          end: event.end,
          title: ` ${event[userDetailsField][nameField]} - ${event.category} phone number- ${event[userDetailsField].phone} 
            at ${event[userDetailsField].address} ,cost per half hour ${event.price}`,
        }));
        let tempEvent = {
          events: tempArr,
          color: "#7ab7ff",
          textColor: "black",
        };
        setEvents([tempEvent]);

        if (id) {
          await getAllProvidersAppointments(id);
        }
      }
    })();
  }, []);

  const handleEventAdd = (addInfo) => {
    handleAddAppointamnet(
      addInfo,
      setShowPopup,
      providerDetails,
      receiverDetails,
      id
    );
  };
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (providerDetails && receiverDetails) {
      if (selectInfo.view.type !== "dayGridMonth") {
        calendarApi
          .addEvent({
            //id: createEventId(),
            title: `${providerDetails.companyName} - ${providerDetails.category} at ${providerDetails.address} cost ${providerDetails.price} `,
            start: selectInfo.start,
            end: selectInfo.end,
          })
          .setAllDay(false);
      }
    }
  };

  function renderEventContent(eventInfo) {
    let range = `${
      eventInfo.event.startStr.match(/[0-9][0-9]:[0-9][0-9]/)[0]
    }-${eventInfo.event.endStr.match(/[0-9][0-9]:[0-9][0-9]/)[0]}`;
    return (
      <>
        <b>{range}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  return (
    <StyledContainer>
      {" "}
      {!showPopup && (
        <FullCalendar
          timeZone="local"
          ref={ref}
          height="auto"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          allDaySlot={false}
          slotMinTime={"07:00:00"}
          slotMaxTime={"20:00:00"}
          eventSources={events}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          eventAdd={handleEventAdd}
          // eventChange={handleEventChange} // called for drag-n-drop/resize
          // eventRemove={handleEventRemove}
        />
      )}
      {showPopup && (
        <AppointmentDetailPopup
          sendEmail={handleSendEmail(showPopup, setMessage, history)}
          closePopUp={() => {
            setShowPopup("");
          }}
          appointment={showPopup}
          message={message}
        />
      )}
    </StyledContainer>
  );
};
export default Calendar;
