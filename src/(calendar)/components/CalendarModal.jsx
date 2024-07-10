import { addHours, differenceInSeconds, set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

import { useUiStore, useCalendarStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();

	const [ formSubmitted, setFormSubmitted ] = useState( false );

	const [ formValues, setFormValues ] = useState( {
		title: '',
		notes: '',
		start: new Date(),
		end: addHours( new Date(), 2 ),
	} );

	const titleClass = useMemo( () => {
		if ( !formSubmitted ) return '';
		return ( formValues.title.length <= 0 ) ? 'is-invalid' : '';
	} )

	useEffect( () => {
		if ( activeEvent !== null ) {
			setFormValues({ ...activeEvent });
		}
	}, [ activeEvent ] );	

	const onChangeInputValues = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	}

	const onChangeDatePickerValues = ( event, changing ) => {
		setFormValues({
			...formValues,
			[changing]: event
		})
	}

	const onCloseModal = () => {
		closeDateModal();
	}

	const onSubmit = async ( event ) => {
		event.preventDefault();
		setFormSubmitted( true );
		const diference = differenceInSeconds( formValues.end, formValues.start );
		
		if ( isNaN( diference ) || diference <= 0 ) {
			Swal.fire('Fechas inválidas', 'La hora de fin debe ser mayor a la de inicio', 'error');
			return;
		}

		if ( formValues.title.length <= 0 ) return;

		console.log( formValues );

		await startSavingEvent( formValues );
		closeDateModal();
	}
	
    return (
		<Modal
			isOpen={ isDateModalOpen }
			onRequestClose={ onCloseModal }
			style={ customStyles }
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={ 200 }
		>

			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={ onSubmit }>

				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<div className='input-group form-control'>
						<DatePicker 
							selected={ formValues.start }
							onChange={ event => onChangeDatePickerValues( event, 'start' ) }
							className='border-0'
							dateFormat="Pp"
							showTimeSelect
							locale="es"
							timeCaption='Hora'
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<div className='input-group form-control'>
						<DatePicker 
							minDate={ formValues.start }
							selected={ formValues.end }
							onChange={ event => onChangeDatePickerValues( event, 'end' ) }
							className='border-0'
							dateFormat="Pp"
							showTimeSelect
							locale="es"
							timeCaption='Hora'
						/>
					</div>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input 
						type="text" 
						className={`form-control ${ titleClass }`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						onChange={ onChangeInputValues }
						value={ formValues.title }
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
				</div>

				<div className="form-group mb-2">
					<textarea 
						type="text" 
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						onChange={ onChangeInputValues }
						value={ formValues.notes }
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Información adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>

			</form>
		</Modal>
	)
}
