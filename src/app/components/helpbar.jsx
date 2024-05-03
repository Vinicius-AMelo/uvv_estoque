'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function HelpBar() {
	const router = useRouter()
	return (
		<>
			<Link href="/docs" className="docs-button">
				?
			</Link>
		</>
	)
}
