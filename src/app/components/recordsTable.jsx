'use client'

import { useQuery } from '@tanstack/react-query'
import '../../scss/components/recordsTable.scss'
import RecordItem from './recordItem'
import axios from 'axios'

export default function RecordsTable() {
	const query = useQuery({
		queryKey: ['records'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3001/products')
			return response.data
		},
	})

	return (
		<table className="records-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome</th>
					<th>Descrição</th>
					<th>Registrado por</th>
					<th>Data registro</th>
					<th>Quantidade</th>
				</tr>
			</thead>
			<tbody>
				{query.data?.map((item, index) => {
					return <RecordItem key={index} record={item} />
				})}
			</tbody>
		</table>
	)
}
