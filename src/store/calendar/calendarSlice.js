import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
	_id: '1',
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

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [tempEvent],
		activeEvent: null,
	},
	reducers: {
		onsetActiveEvent: ( state, { payload } ) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: ( state, { payload } ) => {
			state.events.push( payload );
			state.activeEvent = null;
		},
		onUpdateEvent: ( state, { payload } ) => {
			state.events = state.events.map( event => {
				if ( event._id === payload._id ) {
					return payload;
				}
				return event;
			})
		},
		onDeleteEvent: ( state ) => {
			if ( state.activeEvent ) {
				state.events = state.events.filter( event => event._id !== state.activeEvent._id );
				state.activeEvent = null;
			}
		}
	},
});

export const { onsetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
