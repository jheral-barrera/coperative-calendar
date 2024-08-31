import { useDispatch, useSelector } from "react-redux"
import { onsetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

	const { events, activeEvent } = useSelector( state => state.calendar );
	const { user } = useSelector( state => state.auth );
	const dispatch = useDispatch();

	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onsetActiveEvent( calendarEvent ) );
	}
	
	const startSavingEvent = async ( calendarEvent ) => {

		try {
			if ( calendarEvent.id ) {
				await calendarApi.put( `/events/${calendarEvent.id}`, calendarEvent );
				dispatch( onUpdateEvent({ ...calendarEvent, user }) );
				return;
			}
			
			const { data } = await calendarApi.post( '/events', calendarEvent );
			dispatch( onAddNewEvent({ ...calendarEvent, id: data.event._id, user }) );
		} catch(error) {
			console.log(error)
			Swal.fire('Error to save', error.response.data.message, 'error');
		}


	}

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete( `/events/${activeEvent._id}` );
			dispatch( onDeleteEvent() );
		} catch(error) {
			console.log(error)
			Swal.fire('Error to delete', error.response.data.message, 'error');
		}

	}

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get( '/events' );
			const events = convertEventsToDateEvents( data.events );
			dispatch( onLoadEvents( events ));
			
		} catch (error) {
			console.log('error loading events');
			console.log(error);
		}	
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
		startLoadingEvents
	}
}
