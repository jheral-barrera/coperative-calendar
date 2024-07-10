import { useDispatch, useSelector } from "react-redux"
import { onsetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {

	const { events, activeEvent } = useSelector( state => state.calendar );
	const dispatch = useDispatch();

	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onsetActiveEvent( calendarEvent ) );
	}
	
	const startSavingEvent = async( calendarEvent ) => {
		// todo: guardar en el backend

		if ( calendarEvent._id ) {
			dispatch( onUpdateEvent({ ...calendarEvent }) );
		} else {
			dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
		}
	}

	const startDeletingEvent = () => {
		// todo: guardar en el backend

		dispatch( onDeleteEvent() );
	}

	return {
		// * propiedades
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,


		// * metodos
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
	}
}
