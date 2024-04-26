import '../../scss/components/searchBar.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Calendar from './Calendar'

export default function SearchBar({ stateChange }) {
	const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')
	const [inOut, setInOut] = useState('in')
	const { register } = useForm()

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	function handleClick(event) {
		setInOut(event.target.dataset.value)
	}

	const query = useQuery({
		enabled: false,
		queryKey: ['search'],
		queryFn: async () => {
			const response = await axios.get(
				`https://2e60-187-12-85-253.ngrok-free.app/records/${inOut}?q=${inputValue}`,
				{
					headers: {
						'ngrok-skip-browser-warning': '1',
					},
				}
			)
			return response.data
		},
	})

	useEffect(() => {
		query.refetch()
	}, [inputValue, inOut])

	useEffect(() => {
		if (query.data != [] && query.data != {} && query.data != undefined) {
			setSearchData(query.data)
			stateChange(query.data)
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
					<Calendar />
					<input
						type="button"
						onClick={handleClick}
						className="search__filters--inout-button"
						value="entrada"
						data-value="in"
					/>
					<input
						type="button"
						onClick={handleClick}
						className="search__filters--inout-button"
						value="saída"
						data-value="out"
					/>
				</div>
			</div>
		</>
	)
}
