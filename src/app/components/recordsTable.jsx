'use client';

import { useQuery } from '@tanstack/react-query';
import '../../scss/components/recordsTable.scss';
import RecordItem from './recordItem';
import axios from 'axios';
import { useEffect } from 'react';
const response = axios.get('http://localhost:3001/products');
console.log('---------------');
console.log(response.data);

export default function RecordsTable() {
	// useEffect(() => {
	// 	const response = axios.get('http://127.0.0.1:3001/products', {
	// 		headers: {
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	});
	// 	console.log('---------------');
	// 	console.log(response.data);
	// 	return response.data;
	// }, []);

	return (
		<table className="records-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome</th>
					<th>Registrado por</th>
					<th>Data registro</th>
					<th>Quantidade</th>
				</tr>
			</thead>
			<tbody>
				{/* {data.map((item, index) => {
					<RecordItem key={item} data={index} />;
				})} */}
			</tbody>
		</table>
	);
}
