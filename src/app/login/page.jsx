'use client'

import axios from 'axios'
import Link from 'next/link'
import LoginContainer from '../components/loginContainer'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()
	const router = useRouter()

	const mutation = useMutation({
		mutationFn: async (data) => {
			const { email, password } = data
			const response = await axios.post('http://localhost:3001/login', {
				email,
				password,
			})
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
	console.log(errors)

	return (
		<>
			<LoginContainer>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<label className="loginText" htmlFor="loginText">
						LOGIN
					</label>
					<div className="box">
						<input
							className={`box__input ${errors.email && 'disable'}`}
							type="email"
							id="email"
							placeholder="  Email"
							{...register('email', { required: 'Campo não pode estar vazio' })}
						/>
						{errors.email && <p>{errors.email.message}</p>}
					</div>
					<div className="box">
						<input
							className={`box__input ${errors.password && 'disable'}`}
							type="password"
							id="password"
							placeholder="  Password"
							{...register('password', { required: 'Campo não pode estar vazio' })}
						/>
						{errors.password && <p>{errors.password.message}</p>}
					</div>
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
