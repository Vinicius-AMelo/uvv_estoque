import '../../scss/components/container.scss'
import HelpBar from './helpbar'
import Navbar from './navbar'

export default function Container({ children }) {
	return (
		<>
			<div className="background">
				<div className="background__container">
					<Navbar />
					<div className="background__container--content">{children}</div>
				</div>
			</div>
			<HelpBar></HelpBar>
		</>
	)
}
