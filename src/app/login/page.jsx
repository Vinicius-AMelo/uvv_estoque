'use client'

import axios from 'axios'
import Link from 'next/link'
import LoginContainer from '../components/loginContainer'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
	const { register, handleSubmit, reset } = useForm()
	const router = useRouter()

	const mutation = useMutation({
		mutationFn: async (data) => {
			const { email, password } = data
			const response = await axios.post(
				'https://2e60-187-12-85-253.ngrok-free.app/login',
				{
					email,
					password,
				},
				{
					headers: {
						'ngrok-skip-browser-warning': '1',
					},
				}
			)
			return response.data
		},
	})

	useEffect(() => {
		if (!mutation.data?.message && mutation.data != undefined) {
			localStorage.setItem('uat_cs1', JSON.stringify({ token: mutation.data.token, token_time: new Date() }))
			reset()
			router.push('/')
		}
	}, [mutation.data])

	function onSubmit(data) {
		mutation.mutate(data)
	}

	return (
		<>
			<LoginContainer>
				<form className="input" onSubmit={handleSubmit(onSubmit)}>
					<label className="loginText" htmlFor="loginText">
						LOGIN
					</label>
					<input
						className="emailInput"
						type="email"
						id="email"
						placeholder="  Email"
						{...register('email', { required: true })}
					/>
					<input
						className="passwordInput"
						type="password"
						id="password"
						placeholder="  Password"
						{...register('password', { required: true })}
					/>
					<button className="submit" type="submit">
						Entrar
					</button>
					<p className="created" htmlFor="created">
						<Link href="/register">Ainda não tem cadastro?</Link>
					</p>
				</form>
			</LoginContainer>
		</>
	)
}
