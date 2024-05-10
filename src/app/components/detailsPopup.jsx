'use client'

import '../../scss/components/recordsForm.scss'

export default function DetailsPopup({ showDetailsPopup, record }) {
	function handleClosePopup() {
		showDetailsPopup(null)
	}

	return (
		<>
			<div className="popup-details__container">
				<div>
					<span className="header">Número do chamado: </span>
					<span className="content-call">{record.request}</span>
				</div>
				<div>
					<span className="header">Motivo da solicitação: </span>
					<span className="content-reason">{record.reason}</span>
				</div>
			</div>
			<div className="overlay" onClick={handleClosePopup}></div>
		</>
	)
}
