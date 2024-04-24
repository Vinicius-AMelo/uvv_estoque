import { useEffect, useState } from 'react'

export default function SearchBar() {
	const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	const query = useQuery({
		enabled: false,
		queryKey: ['search'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3001/products')
			return response.data
		},
	})

	useEffect(() => {
		if (inputValue != '') {
			query.refetch()
		}
	}, [inputValue])

	return (
		<>
			<div className="header">
				<input
					className="search"
					type="search"
					placeholder="pesquisar"
					onChange={handleChange}
					value={inputValue}
				/>
			</div>
		</>
	)
}
