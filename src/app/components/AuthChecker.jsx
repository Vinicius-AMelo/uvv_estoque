'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthChecker({ children }) {
	const [authToken, setAuthToken] = useState('')
	const router = useRouter()

	const query = useQuery({
		enabled: false,
		queryKey: ['auth', authToken],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/auth`, {
				headers: {
					Authorization: `${authToken}`,
				},
			})
			return response.data
		},
	})

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const tokenStorage = localStorage.getItem('uat_cs1')
				if (!tokenStorage) return router.push('/login')

				const { token, token_time } = JSON.parse(tokenStorage)
				if (!token) return router.push('/login')

				const timeDiff = new Date().getTime() - new Date(token_time).getTime()

				if (timeDiff > 5) setAuthToken(token)
			} catch (error) {
				console.error('Error checking authentication:', error)
				router.push('/login')
			}
		}

		checkAuthentication()
	}, [])

	useEffect(() => {
		if (authToken != '') query.refetch()
	}, [authToken])

	useEffect(() => {
		if (query.data != undefined) {
			if (!query.data.valid || query.data.message) router.push('/login')
		}
	}, [query.data])

	return children
}
