'use client'

import { useState } from 'react'
import '../../scss/components/recordsTable.scss'
import RecordItem from './recordItem'
import SearchBar from './searchBar'

export default function RecordsTable() {
	const [formData, setFormData] = useState([])
	const [inOut, setInOut] = useState('in')
	const [total, setTotal] = useState(0)
	let somaQuantidade = 0

	function stateChange(data) {
		setFormData(data)
	}
	function inputChange(data) {
		setInOut(data)
	}

	return (
		<>
			<SearchBar stateChange={stateChange} inputChange={inputChange} />
			<div className="records-table">
				<div className="records-table__head">
					<div className="records-table__head--header">
						{inOut == 'stock' && <span className="records-table__head--header-item record-id">ID</span>}
						<span className="records-table__head--header-item record-product_code">Patrimônio</span>
						<span className="records-table__head--header-item record-name">Nome</span>
						<span className="records-table__head--header-item record-description">Descrição</span>
						{inOut != 'stock' && (
							<span className="records-table__head--header-item record-user">Registrado por</span>
						)}
						{inOut == 'in' && (
							<span className="records-table__head--header-item record-date">Data entrada</span>
						)}
						{inOut == 'out' && (
							<span className="records-table__head--header-item record-date">Data saída</span>
						)}
						<span className="records-table__head--header-item record-quantity">Quantidade</span>
					</div>
				</div>
				<ul className="records-table__content">
					{formData.length > 0 &&
						formData.map((item, index) => {
							somaQuantidade += item.quantity
							return <RecordItem key={index} record={item} inOut={inOut} />
						})}
				</ul>
				<div className="records-table__footer">
					{/* {inOut == 'stock' && ( */}
					<div className="records-table__footer--quantity">
						<b>Itens filtrados:</b> {formData.length}
					</div>
					<div className="records-table__footer--quantity-total">
						<b>Quantidade total dos itens filtrados:</b> {somaQuantidade}
					</div>
					{/* )} */}
				</div>
			</div>
		</>
	)
}
