'use client'

import Link from 'next/link'
export default function HelpBar() {
	return (
		<>
			<Link href="/docs" className="docs-button">
				?
			</Link>
		</>
	)
}
