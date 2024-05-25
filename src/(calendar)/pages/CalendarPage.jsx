import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"

import { getMessagesES, localizer } from "../../helpers"
import { Navbar, CalendarEvent } from "../components"
import { is } from "date-fns/locale"
import { useState } from "react"

const events = [
  {
    title: 'Cumpleaños de mi amor',
    notes: 'Nota de ejemplo',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#007bff',
    user: {
      _id: '123',
      name: 'Pequita',
    }
  }
]

export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView ') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({ event, start, end, isSelected })
    
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
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ select: event });
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
    </>
  )
}
