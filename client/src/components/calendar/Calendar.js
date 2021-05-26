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
  createNewServiceBooked,
  sendEmailForServiceBooked,
} from "../../apis/servicesBookedApi";
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
        console.log("tempArr", tempArr);
        let tempEvent = {
          events: tempArr,
          color: "#7ab7ff",
          textColor: "black",
        };
        console.log(tempEvent);

        // receiver : name address phone
        // provider : comnpanyName address phone
        setEvents([tempEvent]);

        if (id) {
          let provider = await getProvider(id);
          setProviderDetails(provider);
          let receiver = await getUser("receiver");
          setReceiverDetails(receiver);
          let providersEvents = await getAllProviderServiceBooked(id);
          let tempArr = providersEvents.map((event) => ({
            start: event.start,
            end: event.end,
            title: " Not Available",
          }));
          tempEvent = {
            events: tempArr,
            color: "#E42645",
            textColor: "white",
          };
          setEvents((prevState) => {
            console.log([...prevState, tempEvent]);
            return [...prevState, tempEvent];
          });
          console.log("events", events);
        }
      }
    })();
  }, []);
  const handleSendEmail = async () => {
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
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo);
    //let title = prompt("Please enter a new title for your event");
    console.log(selectInfo.view);

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
  // const handleEventClick = (clickInfo) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // };

  const handleEventAdd = async (addInfo) => {
    try {
      console.log(addInfo.event);
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
      console.log("appotment", appointment);

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
  function renderEventContent(eventInfo) {
    // console.log(eventInfo.event);
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
          // eventChange={this.handleEventChange} // called for drag-n-drop/resize
          // eventRemove={this.handleEventRemove}
        />
      )}
      {showPopup && (
        <AppointmentDetailPopup
          sendEmail={handleSendEmail}
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
