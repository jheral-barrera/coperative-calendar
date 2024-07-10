import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

export const AddNewEventButton = () => {
	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const onClickNewEvent = () => {
		setActiveEvent( 
			{ 
				title: '', 
				notes: '',
				start: new Date(), 
				end: addHours( new Date(), 2 ),
				user: {
					_id: '123',
					name: 'Pequita',
				} 
				
			} 
		);

		openDateModal();
	}

  return (
	<button 
		className="btn btn-primary fab"
		onClick={ onClickNewEvent }
	>
		<i className="fas fa-plus"></i>
	</button>
  )
}
