export default function RecordItem({ record, inOut }) {
	const createdAt = new Date(record.createdAt)
	return (
		<tr>
			{inOut == 'stock' && <td>{record.id}</td>}
			<td>{record.product_code > 0 ? record.product_code : '-'}</td>
			<td>{record.name}</td>
			<td>{record.description}</td>
			{record.user && <td>{record.user.name}</td>}
			{record.createdAt && <td>{createdAt.toLocaleDateString('pt-BR')}</td>}
			<td>{record.quantity}</td>
		</tr>
	)
}
