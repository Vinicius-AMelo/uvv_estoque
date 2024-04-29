import '../../scss/components/popup.scss'

export default function Popup({ mensage, color }) {
	return (
		<>
			<div className="container-popup">
				<p className="popup">{mensage}</p>
				<div class="time-bar" style={{ backgroundColor: color }}></div>
			</div>
		</>
	)
}
