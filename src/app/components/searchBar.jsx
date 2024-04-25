import '../../scss/components/searchBar.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Calendar from './Calendar'
import Link from 'next/link'

export default function SearchBar({ stateChange }) {
	const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')
	const { register } = useForm()
	const inOut = 'in'
	function handleChange(event) {
		setInputValue(event.target.value)
	}

	const query = useQuery({
		enabled: false,
		queryKey: ['search'],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:3001/records/${inOut}?q=${inputValue}`)
			return response.data
		},
	})

	useEffect(() => {
		query.refetch()
	}, [inputValue])

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
					<Link href="/" className="search__filters--inout-button">
						entrada
					</Link>
					<Link href="/" className="search__filters--inout-button">
						saída
					</Link>
				</div>
			</div>
		</>
	)
}
