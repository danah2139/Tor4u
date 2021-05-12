import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getUserType } from "../../apis/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getAllProviderServiceBooked,
  getUserServiceBooked,
  createNewServiceBooked,
} from "../../apis/servicesBookedApi";
import { getUser, getProvider } from "../../apis/usersApi";
const Calendar = () => {
  const [userType, setUserType] = useState("");
  const [providerDetails, setProviderDetails] = useState("");
  const [receiverDetails, setReceiverDetails] = useState("");
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const type = await getUserType();
      setUserType(type);
      let otherUserType = type === "provider" ? "receiver" : "provider";
      let userEvents = await getUserServiceBooked(type);
      let userDetailsField = otherUserType + "Details";
      let nameField = otherUserType === "provider" ? "companyName" : "name";
      console.log("userEvents", userEvents);
      if (userEvents) {
        let tempArr = userEvents.map((event) => ({
          start: event.start,
          end: event.end,
          title:
            event[userDetailsField][nameField] +
            " " +
            event.category +
            " Price: " +
            event.price +
            " Phone: " +
            event[userDetailsField].phone +
            event[userDetailsField].address,
        }));
        // receiver : name address phone
        // provider : comnpanyName address phone
        setEvents(...events, {
          events: tempArr,
          color: "red",
          textColor: "white",
        });
        console.log(events);
        if (id) {
          let provider = await getProvider(id);
          setProviderDetails(provider);
          let receiver = await getUser("receiver");
          setReceiverDetails(receiver);
          const providersEvents = await getAllProviderServiceBooked(id);
          let tempArr = providersEvents.map((event) => ({
            start: event.start,
            end: event.end,
            title: "Not Available",
          }));
          setEvents(...events, {
            events: tempArr,
            color: "blue",
            textColor: "black",
          });
          console.log("providersEvents", events);
        }
      }
    })();
  }, []);
  const handleDateSelect = async (selectInfo) => {
    console.log(selectInfo);
    //let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (providerDetails && receiverDetails) {
      calendarApi.addEvent({
        //id: createEventId(),
        title:
          providerDetails.price +
          providerDetails.category +
          providerDetails.companyName,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      });
    }
  };
  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    // this.setState({
    //   currentEvents: events
    // })
  };

  const handleEventAdd = async (addInfo) => {
    try {
      console.log("addInfo", addInfo.event);
      await createNewServiceBooked({
        provider: id,
        receiver: receiverDetails._id,
        category: providerDetails.category,
        price: providerDetails.price,
        start: addInfo.event.start,
        end: addInfo.end,
        receiverDetails: {
          phone: receiverDetails.phone,
          address: receiverDetails.address,
          name: receiverDetails.name,
        },
        providerDetails: {
          phone: providerDetails.phone,
          address: providerDetails.address,
          comapnyName: providerDetails.comapnyName,
        },
      });
    } catch (e) {
      console.log(e);
      addInfo.revert();
    }
  };
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  return (
    <div>
      {" "}
      <FullCalendar
        height="auto"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
        slotMinTime={"07:00:00"}
        slotMaxTime={"20:00:00"}
        events={events}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventAdd={handleEventAdd}
        // eventChange={this.handleEventChange} // called for drag-n-drop/resize
        // eventRemove={this.handleEventRemove}
      />
    </div>
  );
};
export default Calendar;
