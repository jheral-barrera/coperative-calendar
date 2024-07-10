import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

export const DeleteEventButton = () => {

	const { startDeletingEvent, hasEventSelected } = useCalendarStore();

	const onClickDeleteEvent = () => {
		startDeletingEvent();
	}


  return (
	<button 
		className="btn btn-danger fab-delete"
		onClick={ onClickDeleteEvent }
		style={ { display: hasEventSelected ? '' : 'none' } }
	>
		<i className="fas fa-trash-alt"></i>
	</button>
  )
}
