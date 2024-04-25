'use client'

import '../../scss/components/navbar.scss'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
	const pathname = usePathname()
	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<Image
					className="navbar__logo--image"
					width={150}
					height={43.5}
					src="/logouvv.svg"
					priority="true"
					alt="Logo UVV"
				/>
			</div>
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<Link className={`navbar__menu--item-link ${pathname === '/' ? 'active' : ''}`} href="/">
						registros
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link
						className={`navbar__menu--item-link ${pathname === '/recordsin' ? 'active' : ''}`}
						href="/recordsin"
					>
						entrada no estoque
					</Link>
				</li>
				<li className="navbar__menu--item">
					<Link
						className={`navbar__menu--item-link ${pathname === '/recordsout' ? 'active' : ''}`}
						href="/recordsout"
					>
						baixa no estoque
					</Link>
				</li>
			</ul>
		</nav>
	)
}
