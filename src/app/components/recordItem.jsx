import Link from 'next/link'

export default function RecordItem({ record, inOut }) {
	const createdAt = new Date(record.createdAt)
	return (
		<li className="records-table__content--body">
			{inOut == 'stock' && <span className="records-table__content--body-item record-id">{record.id}</span>}
			<span className="records-table__content--body-item record-product_code">{record.product_code > 0 ? record.product_code : '-'}</span>
			<span className="records-table__content--body-item record-name">{record.name.toLowerCase()}</span>
			<span className="records-table__content--body-item record-description">{record.description}</span>
			{record.user && <span className="records-table__content--body-item record-user">{record.user.name}</span>}
			{record.createdAt && <span className="records-table__content--body-item record-date">{createdAt.toLocaleDateString('pt-BR')}</span>}
			<span className="records-table__content--body-item record-quantity">{record.quantity}</span>
			{inOut == 'stock' && <Link href={`/recordsout?id=${record.id}`}>Dar baixa</Link>}
		</li>
	)
}
