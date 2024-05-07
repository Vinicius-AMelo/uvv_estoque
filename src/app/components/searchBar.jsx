import '../../scss/components/searchBar.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Calendar from './Calendar'

export default function SearchBar({ stateChange, inputChange }) {
	// const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')
	const [typeValue, setTypeValue] = useState('')
	const [inOut, setInOut] = useState('stock')
	const [nameCount, setNameCount] = useState({})
	const [selectType, setSelectType] = useState(false)
	const [date, setDate] = useState({ startDate: '', endDate: '' })
	const { register } = useForm()

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	function handleClick(event) {
		setInOut(event.target.dataset.value)
	}

	function handleDate(date) {
		if (date.startDate && date.endDate) {
			const startDate = `${date.startDate}T00:00:00Z`
			const endDate = `${date.endDate}T23:59:59Z`
			setDate({ startDate: startDate, endDate: endDate })
		} else {
			setDate({ startDate: '', endDate: '' })
		}
	}

	function handleType(item) {
		if (typeValue == '') {
			setTypeValue(item)
			setSelectType(false)
		}
	}

	const query = useQuery({
		enabled: false,
		queryKey: ['searchBar'],
		queryFn: async () => {
			const response = await axios.get(
				`http://10.1.1.19:3001/records/${inOut}?q=${inputValue}&type=${typeValue}&min_date=${date.startDate}&max_date=${date.endDate}`
			)
			return response.data
		},
	})

	useEffect(() => {
		query.refetch()
		inputChange(inOut)
	}, [inputValue, typeValue, inOut, date])

	useEffect(() => {
		if (query.data != [] && query.data != {} && query.data != undefined) {
			stateChange(query.data)
			query.data.map((item) => {
				const lowerName = item.name.toLowerCase()
				if (!nameCount[lowerName]) nameCount[lowerName] = true
			})
		}
	}, [query.data])

	return (
		<>
			<div className="search__container">
				<div className="search__bar">
					<Image width={24} height={24} src="/search_icon.svg" />
					<input
						className="search__bar"
						type="search"
						placeholder="pesquisar"
						{...register('search', { onChange: handleChange })}
						value={inputValue}
					/>
				</div>
				<div className="search__filters">
					<div>
						{inOut != 'stock' && <Calendar handleDate={handleDate} />}
						<div className="input_container">
							{/* {typeValue != '' && <input type="text" />} */}
							<button
								type="button"
								className="type-filter__button"
								onClick={() => {
									if (typeValue == '') setSelectType(true)
								}}
							>
								{typeValue != '' ? typeValue : 'filtrar categoria'}
								{typeValue != '' && <button onClick={() => setTypeValue('')} />}
							</button>
							<ul className="options" onBlur={() => setSelectType(false)}>
								{Object.keys(nameCount).length > 0 &&
									selectType &&
									Object.keys(nameCount).map((item, index) => {
										return (
											<li key={index} className="options__item" onClick={() => handleType(item)}>
												{item}
											</li>
										)
									})}
							</ul>
						</div>
					</div>
					<div>
						<input
							type="button"
							onClick={handleClick}
							className={`search__filters--inout-button ${inOut == 'in' && 'active'}`}
							value="entrada"
							data-value="in"
						/>
						<input
							type="button"
							onClick={handleClick}
							className={`search__filters--inout-button ${inOut == 'out' && 'active'}`}
							value="saída"
							data-value="out"
						/>
						<input
							type="button"
							onClick={handleClick}
							className={`search__filters--inout-button ${inOut == 'stock' && 'active'}`}
							value="estoque"
							data-value="stock"
						/>
					</div>
				</div>
			</div>
		</>
	)
}
