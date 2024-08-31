import { useEffect, useState } from "react"
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessagesES, localizer } from "../../helpers"
import { Navbar, CalendarEvent, CalendarModal, AddNewEventButton, DeleteEventButton } from "../"
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks"
import { is } from "date-fns/locale"

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView ') || 'week' );

  useEffect( () => {
    startLoadingEvents();
  }, [] );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user.uid );

    // console.log(event);

    const style = {
      backgroundColor: isMyEvent ? '#007bff' : '#465660',
      color: 'white',
      borderRadius: '0px',
      // padding: '4px 8px',
      opacity: 0.8,
      cursor: 'pointer',
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
	openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ select: event });
	setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        messages={ getMessagesES() }

        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}

        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged}
      />

	  <CalendarModal />
	  <AddNewEventButton />
	  <DeleteEventButton />
    </>
  )
}
