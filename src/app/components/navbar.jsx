import Image from 'next/image'
import Link from 'next/link'
import '../../scss/components/navbar.scss'

export default function Navbar() {
	return (
		<nav className="navbar">
			<Image
				className="navbar__logo"
				width={150}
				height={43.5}
				src="/logouvv.svg"
				priority="true"
				alt="Logo UVV"
			/>
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/">
						registros
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/recordsin">
						entrada no estoque
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/recordsout">
						baixa no estoque
					</Link>
				</li>
			</ul>
		</nav>
	)
}
