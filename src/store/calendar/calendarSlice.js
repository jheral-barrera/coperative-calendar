import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
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

	},
});

export const { } = calendarSlice.actions;
