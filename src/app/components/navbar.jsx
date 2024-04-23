import Image from 'next/image';
import Link from 'next/link';
import '../../scss/components/navbar.scss';

export default function Navbar() {
	return (
		<nav className="navbar">
			<Image className="navbar__logo" width={150} height={50} src="/logouvv.svg" />
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/login">
						registros
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/login">
						entrada no estoque
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link className="navbar__menu--item-link" href="/login">
						baixa no estoque
					</Link>
				</li>
			</ul>
		</nav>
	);
}
