import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

export default function Calendar() {
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	function onChange(dates) {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	return (
		<ReactDatePicker
			selected={startDate}
			onChange={onChange}
			startDate={startDate}
			endDate={endDate}
			selectsRange
			locale="pt-BR"
			placeholderText="filtrar data"
			isClearable={true}
			clea
		/>
	)
}
