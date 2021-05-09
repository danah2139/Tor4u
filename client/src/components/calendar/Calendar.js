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
const Calendar = () => {
  const [userType, setUserType] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const type = await getUserType();
      setUserType(type);
      const userEvents = await getUserServiceBooked(type);
      console.log("userEvents", userEvents);
      if (id) {
        const providersEvents = await getAllProviderServiceBooked({ id });
        console.log("providersEvents", providersEvents);
      }
    })();
  }, []);
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        //id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
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
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents}
      />
    </div>
  );
};
export default Calendar;
