'use client'

import Link from 'next/link'
import LoginContainer from '../components/loginContainer'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function Register() {
	const { register, handleSubmit } = useForm()

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { name, email, password } = data
			const response = await axios.post(
				'https://2e60-187-12-85-253.ngrok-free.app/register',
				{
					name,
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

	function onSubmit(data) {
		mutation.mutate(data)
	}
	return (
		<>
			<LoginContainer>
				<form className="input" onSubmit={handleSubmit(onSubmit)}>
					<label className="loginText" htmlFor="loginText">
						REGISTER
					</label>
					<input
						className="nameInput"
						type="text"
						id="name"
						placeholder="  Name"
						{...register('name', { required: true })}
					/>
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
						Cadastrar
					</button>
				</form>
			</LoginContainer>
		</>
	)
}
