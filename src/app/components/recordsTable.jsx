'use client'

import { useState } from 'react'
import '../../scss/components/recordsTable.scss'
import RecordItem from './recordItem'
import SearchBar from './searchBar'

export default function RecordsTable() {
	const [formData, setFormData] = useState([])
	const [inOut, setInOut] = useState('in')

	function stateChange(data) {
		setFormData(data)
	}
	function inputChange(data) {
		setInOut(data)
	}

	return (
		<>
			<SearchBar stateChange={stateChange} inputChange={inputChange} />
			<table className="records-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Patrimônio</th>
						<th>Nome</th>
						<th>Descrição</th>
						<th>Registrado por</th>
						{inOut == 'in' && <th>Data entrada</th>}
						{inOut == 'out' && <th>Data saída</th>}
						<th>Quantidade</th>
					</tr>
				</thead>
				<tbody>
					{formData.length > 0 &&
						formData.map((item, index) => {
							return <RecordItem key={index} record={item} />
						})}
				</tbody>
			</table>
		</>
	)
}
