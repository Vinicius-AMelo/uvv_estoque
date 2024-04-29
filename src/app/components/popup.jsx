import '../../scss/components/popup.scss'

export default function Popup({ message, color }) {
	return (
		<>
			<div className="container-popup">
				<p className="popup">{message}</p>
				<div className="time-bar" style={{ backgroundColor: color }}></div>
			</div>
		</>
	)
}
