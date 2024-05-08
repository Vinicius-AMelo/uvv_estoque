'use client'

import '../../scss/components/navbar.scss'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'

export default function Navbar() {
	const pathname = usePathname()
	const [roleValue, setRoleValue] = useState('DEFAULT')

	useEffect(() => {
		const tokenStorage = localStorage.getItem('uat_cs1')
		if (!tokenStorage) return
		const { token } = JSON.parse(tokenStorage)
		const { role } = jwt.decode(token, process.env.JWT_SECRET)
		setRoleValue(role)
	}, [roleValue])

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<Image className="navbar__logo--image" width={150} height={43.5} src="/logouvv.svg" priority="true" alt="Logo UVV" />
			</div>
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<Link className={`navbar__menu--item-link ${pathname === '/' ? 'active' : ''}`} href="/">
						registros
					</Link>
				</li>
				<li className="navbar__menu--item">
					{roleValue == 'DEFAULT' && <span className={`navbar__menu--item-link disabled`}>entrada no estoque</span>}

					{roleValue == 'SUPER' && (
						<Link className={`navbar__menu--item-link ${pathname === '/recordsin' ? 'active' : ''}`} href="/recordsin">
							entrada no estoque
						</Link>
					)}
				</li>
				<li className="navbar__menu--item">
					{roleValue == 'DEFAULT' && <span className={`navbar__menu--item-link disabled`}>entrada no estoque</span>}

					{roleValue == 'SUPER' && (
						<Link className={`navbar__menu--item-link ${pathname === '/recordsout' ? 'active' : ''}`} href="/recordsout">
							baixa no estoque
						</Link>
					)}
				</li>
			</ul>
		</nav>
	)
}
