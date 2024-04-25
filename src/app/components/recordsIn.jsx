'use client'

import { useMutation } from '@tanstack/react-query'
import '../../scss/components/recordsForm.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Logo from '../../../public/Logo.png'
import { useState } from 'react'
import Image from 'next/image'

export default function RecordsIn() {
	const { register, handleSubmit } = useForm()

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { name, description, quantity, product_code, checkbox } = data
			const response = await axios.post('http://localhost:3001/records/in', {
				name,
				description,
				quantity: checkbox ? 1 : parseInt(quantity),
				product_code: parseInt(product_code),
				id: 1,
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['search'] })
		},
	})

	function onSubmit(data) {
		mutation.mutate(data)
	}
	return (
		<>
			<div className="form_container">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="input__container--check">
						<label>Produto possui patrimônio?</label>
						<input type="checkbox" id="checkbox" {...register('product_code')} />
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
						<input type="number" id="quantity" {...register('quantity', { required: true })} />
					</div>
					<div className="input__container">
						<label htmlFor="">Descrição </label>
						<textarea rows={4} id="description" {...register('description', { required: true })} />
					</div>
					<button type="submit">ENVIAR</button>
				</form>
				<div className="logo">
					<Image width="250" height="250" src={Logo} alt="UVV logo" className="img" />
				</div>
			</div>
		</>
	)
}
