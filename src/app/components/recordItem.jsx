export default function RecordItem({ record }) {
	const createdAt = new Date(record.createdAt)
	return (
		<tr>
			<td>{record.id}</td>
			<td>{record.name}</td>
			<td>{record.description}</td>
			<td>{record.user.name}</td>
			<td>{createdAt.toLocaleDateString('pt-BR')}</td>
			<td>{record.quantity}</td>
		</tr>
	)
}
