'use client'

import Link from 'next/link'
import LoginContainer from '../components/loginContainer'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Register() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { name, email, password } = data
			const response = await axios.post('http://10.1.1.19:3001/register', {
				name,
				email,
				password,
			})
			return response.data
		},
		onSuccess: () => {
			router.push('/login')
		},
	})

	function onSubmit(data) {
		mutation.mutate(data)
	}
	return (
		<>
			<LoginContainer>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<label className="loginText" htmlFor="loginText">
						REGISTER
					</label>
					<div className="box">
						<input
							className={`box__input ${errors.password && 'disable'}`}
							type="text"
							id="name"
							placeholder="  Name"
							{...register('name', { required: 'Campo não pode estar vazio' })}
						/>
						{errors.name && <p>{errors.name.message}</p>}
					</div>
					<div className="box">
						<input
							className={`box__input ${errors.password && 'disable'}`}
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
						{!mutation.isPending && 'Cadastrar'}
						{mutation.isPending && <span className="loading"></span>}
					</button>
				</form>
			</LoginContainer>
		</>
	)
}
