import { useState } from "react"
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessagesES, localizer } from "../../helpers"
import { Navbar, CalendarEvent, CalendarModal, AddNewEventButton, DeleteEventButton } from "../"
import { useUiStore, useCalendarStore } from "../../hooks"

export const CalendarPage = () => {

  const { openDateModal, closeDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView ') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '5px',
      padding: '4px 8px',
      opacity: 0.5,
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
