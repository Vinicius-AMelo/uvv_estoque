'use client'

import { useState } from 'react'
import '../../scss/components/recordsTable.scss'
import RecordItem from './recordItem'
import SearchBar from './searchBar'
import RequestPopup from './requestPopup'
import DetailsPopup from './detailsPopup'
import Popup from './popup'

export default function RecordsTable() {
	const [formData, setFormData] = useState([])
	const [inOut, setInOut] = useState('in')
	const [valueRequestPopup, setValueRequestPopup] = useState(null)
	const [valueDetailsPopup, setValueDetailsPopup] = useState(null)
	const [showPopup, setShowPopup] = useState(false)
	let somaQuantidade = 0

	function stateChange(data) {
		setFormData(data)
	}

	function inputChange(data) {
		setInOut(data)
	}

	function showRequestPopup(data) {
		if (data == null) return setValueRequestPopup(data)
		setValueRequestPopup(parseInt(data))
	}

	function showDetailsPopup(data) {
		if (data == null) return setValueDetailsPopup(data)
		setValueDetailsPopup(data)
	}

	function showMessagePopup(data) {
		setShowPopup(data)
	}

	return (
		<>
			<SearchBar stateChange={stateChange} inputChange={inputChange} />
			<div className="records-table">
				<div className="records-table__head">
					<div className="records-table__head--header">
						{inOut == 'stock' && <span className="records-table__head--header-item record-id">ID</span>}
						<span className="records-table__head--header-item record-product_code">Patrimônio</span>
						<span className="records-table__head--header-item record-name">Categoria</span>
						<span className="records-table__head--header-item record-description">Modelo</span>
						{inOut != 'stock' && <span className="records-table__head--header-item record-user">Registrado por</span>}
						{inOut == 'in' && <span className="records-table__head--header-item record-date">Data entrada</span>}
						{inOut == 'out' && <span className="records-table__head--header-item record-date">Data saída</span>}
						<span className="records-table__head--header-item record-quantity">Quantidade</span>
					</div>
				</div>
				<ul className="records-table__content">
					{formData.length > 0 &&
						formData.map((item, index) => {
							somaQuantidade += item.quantity
							return (
								<RecordItem key={index} record={item} inOut={inOut} showRequestPopup={showRequestPopup} showDetailsPopup={showDetailsPopup} />
							)
						})}
				</ul>
				<div className="records-table__footer">
					<div className="records-table__footer--quantity">
						<b>Itens filtrados:</b> {formData.length}
					</div>
					<div className="records-table__footer--quantity-total">
						<b>Quantidade total dos itens filtrados:</b> {somaQuantidade}
					</div>
				</div>
			</div>
			{inOut == 'stock' && valueRequestPopup != null && (
				<RequestPopup recordId={valueRequestPopup} showRequestPopup={showRequestPopup} showMessagePopup={showMessagePopup} />
			)}
			{showPopup && <Popup message={showPopup.message} color={showPopup.color}></Popup>}
			{inOut == 'out' && valueDetailsPopup != null && <DetailsPopup record={valueDetailsPopup} showDetailsPopup={showDetailsPopup} />}
		</>
	)
}
