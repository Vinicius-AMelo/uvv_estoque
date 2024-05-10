'use client'

import '../../scss/components/recordsForm.scss'

export default function DetailsPopup({ showDetailsPopup, record }) {
	function handleClosePopup() {
		showDetailsPopup(null)
	}
	console.log(record)
	return (
		<>
			<div className="popup__container">
				<div>
					<span>Número do chamado:</span>
					<span>{record.request}</span>
				</div>
				<div>
					<span>Motivo da solicitação:</span>
					<span>{record.reason}</span>
				</div>
			</div>
			<div className="overlay" onClick={handleClosePopup}></div>
		</>
	)
}
