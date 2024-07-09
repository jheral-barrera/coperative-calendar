import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isDateModalOpen: false,
	},
	reducers: {
		// La manera en la se modifica el estado es solamente
		// por utilizar redux toolkit
		onOpenDateModal: ( state ) => { 
			state.isDateModalOpen = true;
		},
		onCloseDateModal: ( state ) => { 
			state.isDateModalOpen = false;
		},
	},
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
