import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SearchBar({ stateChange }) {
	const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')
	const { register } = useForm()

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	const query = useQuery({
		enabled: false,
		queryKey: ['search'],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:3001/products?q=${inputValue}`)
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
			<div className="header">
				<input
					className="search"
					type="search"
					placeholder="pesquisar"
					{...register('search', { onChange: handleChange })}
					value={inputValue}
				/>
			</div>
		</>
	)
}
