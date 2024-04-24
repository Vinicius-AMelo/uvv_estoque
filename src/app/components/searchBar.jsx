import { useState } from 'react'

export default function SearchBar() {
	const [searchData, setSearchData] = useState({})
	const [inputValue, setInputValue] = useState('')

	function handleChange(event) {
		console.log(event.target.value)
	}

	return (
		<>
			<div className="header">
				<input className="search" type="search" placeholder="pesquisar" onChange={handleChange} />
			</div>
		</>
	)
}
