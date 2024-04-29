'use client'

import { useMutation } from '@tanstack/react-query'
import '../../scss/components/recordsForm.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Logo from '../../../public/Logo.png'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Popup from './popup'

export default function RecordsIn() {
	const { register, reset, handleSubmit } = useForm()
	const [checkboxValue, setcheckboxValue] = useState(true)
	const [token, setToken] = useState('')

	const mutation = useMutation({
		mutationFn: async (data) => {
			const { name, description, quantity, product_code, checkbox } = data
			const response = await axios.post(
				'http://localhost:3001/records/in',
				{
					name,
					description,
					quantity: checkbox ? 1 : parseInt(quantity),
					product_code: parseInt(product_code),
				},
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			)
			return response.data
		},
	})

	function onSubmit(data) {
		mutation.mutate(data)
	}

	function handleChange(event) {
		setcheckboxValue(event.target.checked)
	}

	useEffect(() => {
		if (mutation.data != undefined) {
			if (mutation.data == 'Created') reset()
		}
	}, [mutation.data])

	useEffect(() => {
		const tokenStorage = localStorage.getItem('uat_cs1')
		console.log(tokenStorage)
		if (!tokenStorage) return
		const { token } = JSON.parse(tokenStorage)
		setToken(token)
		console.log(token)
	}, [])

	return (
		<>
			<Popup mensage={'Cadastro realizado com sucesso'} color={'green'}></Popup>
			<div className="content">
				<div className="form_container">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input__container--check">
							<label>Produto possui patrimônio?</label>
							<label className="switch" htmlFor="checkbox">
								<input
									type="checkbox"
									id="checkbox"
									{...register('checkbox', { onChange: handleChange })}
									checked={checkboxValue}
								/>
								<div className="slider round"></div>
							</label>
						</div>
						<div className="input__container">
							<label htmlFor="">Patrimônio </label>
							<input type="text" id="product_code" {...register('product_code', { required: true })} />
						</div>
						<div className="input__container">
							<label htmlFor="">Modelo </label>
							<input type="text" id="name" {...register('name', { required: true })} />
						</div>
						<div className="input__container">
							<label htmlFor="">Quantidade </label>
							<input
								type="number"
								id="quantity"
								disabled={checkboxValue}
								{...register('quantity', { required: !checkboxValue })}
							/>
						</div>
						<div className="input__container">
							<label htmlFor="">Descrição </label>
							<textarea rows={4} id="description" {...register('description', { required: true })} />
						</div>
						<button type="submit">ENVIAR</button>
					</form>
				</div>
				<div className="logo">
					<Image width="250" height="250" src={Logo} alt="UVV logo" className="img" />
				</div>
			</div>
		</>
	)
}
