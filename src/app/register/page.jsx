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
			const response = await axios.post('http://localhost:3001/register', {
				name,
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
					REGISTER
				</label>
				<form className="input" onSubmit={handleSubmit(onSubmit)}>
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
