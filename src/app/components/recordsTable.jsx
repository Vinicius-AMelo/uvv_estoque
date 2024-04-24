'use client'

import { useQuery } from '@tanstack/react-query'
import '../../scss/components/recordsTable.scss'
import RecordItem from './recordItem'
import axios from 'axios'
import SearchBar from './searchBar'
import { useEffect, useState } from 'react'

export default function RecordsTable() {
	const [formData, setFormData] = useState([])

	function stateChange(data) {
		setFormData(data)
	}

	return (
		<>
			<SearchBar stateChange={stateChange} />
			<table className="records-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Patrimônio</th>
						<th>Nome</th>
						<th>Descrição</th>
						<th>Registrado por</th>
						<th>Data registro</th>
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
