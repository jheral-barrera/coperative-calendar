import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"

import { getMessagesES, localizer } from "../../helpers"
import { Navbar } from "../components"
import { is } from "date-fns/locale"

const events = [
  {
    title: 'Cumpleaños de mi amor',
    notes: 'Nota de ejemplo',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#007bff',
    user: {
      _id: '123',
      name: 'Jheral',
    }
  }
]

export const CalendarPage = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({ event, start, end, isSelected })
    
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

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        messages={ getMessagesES() }

        eventPropGetter={ eventStyleGetter }
      />
    </>
  )
}
