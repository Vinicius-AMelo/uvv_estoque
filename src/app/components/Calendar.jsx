import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

export default function Calendar({ handleDate }) {
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	function onChange(dates) {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	useEffect(() => {
		if (startDate && endDate) {
			const startISODate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`
			const endISODate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`

			handleDate({ startDate: startISODate, endDate: endISODate })
		}
	}, [startDate, endDate])

	return (
		<ReactDatePicker
			selected={startDate}
			onChange={onChange}
			startDate={startDate}
			endDate={endDate}
			selectsRange
			placeholderText="filtrar data"
			isClearable={true}
		/>
	)
}
