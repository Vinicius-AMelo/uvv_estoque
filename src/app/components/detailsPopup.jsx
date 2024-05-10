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
