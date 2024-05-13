import Link from 'next/link'
import jwt from 'jsonwebtoken'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function RecordItem({ record, inOut, showRequestPopup, showDetailsPopup }) {
	const [roleValue, setRoleValue] = useState('DEFAULT')
	const createdAt = new Date(record.createdAt)

	useEffect(() => {
		const tokenStorage = localStorage.getItem('uat_cs1')
		if (!tokenStorage) return
		const { token } = JSON.parse(tokenStorage)
		const { role } = jwt.decode(token, process.env.JWT_SECRET)
		setRoleValue(role)
	}, [roleValue])

	function handleClick(event) {
		showRequestPopup(event.target.value)
	}

	function handleDetailsPopup(event) {
		showDetailsPopup({ request: event.target.dataset.request, reason: event.target.dataset.reason })
	}

	return (
		<li className="records-table__content--body">
			{inOut == 'stock' && <span className="records-table__content--body-item record-id">{record.id}</span>}
			<span className="records-table__content--body-item record-product_code">{record.product_code > 0 ? record.product_code : '-'}</span>
			<span className="records-table__content--body-item record-name">{record.name.toLowerCase()}</span>
			<span className="records-table__content--body-item record-description">{record.description}</span>
			{record.user && <span className="records-table__content--body-item record-user">{record.user.name}</span>}
			{record.createdAt && <span className="records-table__content--body-item record-date">{createdAt.toLocaleDateString('pt-BR')}</span>}
			<span className="records-table__content--body-item record-quantity">
				{record.quantity}
				{inOut == 'stock' &&
					(roleValue == 'SUPER' ? (
						<Link href={`/recordsout?id=${record.id}`}>
							<Image className="recordsout_icon" width={24} height={24} alt="Dar baixa" src="/open-box-icon.svg" />
						</Link>
					) : (
						<button onClick={handleClick} value={record.id}>
							<Image className="recordsout_icon" width={24} height={24} alt="Enviar solicitação" src="/open-box-icon.svg" />
						</button>
					))}

				{inOut == 'out' && (
					<button className="details" onClick={handleDetailsPopup} data-request={record.request_code} data-reason={record.out_reason}>
						<Image className="recordsout_icon " width={24} height={24} alt="Enviar solicitação" src="/details-icon.svg" />
					</button>
				)}
			</span>
		</li>
	)
}
