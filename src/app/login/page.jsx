'use client'

import Link from 'next/link'
import LoginContainer from '../components/loginContainer'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function Login() {
	const { register, handleSubmit } = useForm()

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { email, password } = data
			const response = await axios.post('http://localhost:3001/login', {
				email,
				password,
			})
			return response.data
		},
	})

	function onSubmit(data) {
		mutation.mutate(data)
	}

	return (
		<>
			<LoginContainer>
				<label className="loginText" htmlFor="loginText">
					LOGIN
				</label>
				<form className="input" onSubmit={handleSubmit(onSubmit)}>
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
