'use client'

import '../../scss/components/recordsForm.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Logo from '../../../public/Logo.png'
import Image from 'next/image'

export default function RecordsForm() {
	const { register, handleSubmit, setValue, reset } = useForm()
	const [inputValue, setInputValue] = useState('')
	const [formData, setFormData] = useState({})

	const query = useQuery({
		enabled: false,
		queryKey: ['records'],
		queryFn: async () => {
			const response = await axios.get(`https://2e60-187-12-85-253.ngrok-free.app/records/in?q=${inputValue}`, {
				headers: {
					'ngrok-skip-browser-warning': '1',
				},
			})
			return response.data
		},
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			const { name, description, quantity, product_code, request_code } = data
			const response = await axios.post(
				'https://2e60-187-12-85-253.ngrok-free.app/records/out',
				{
					name,
					description,
					quantity: parseInt(quantity),
					product_code: parseInt(product_code),
					request_code: parseInt(request_code),
					id: 1,
				},
				{
					headers: {
						'ngrok-skip-browser-warning': '1',
					},
				}
			)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['search'] })
		},
	})

	useEffect(() => {
		if (inputValue != '') {
			query.refetch()
		}
	}, [inputValue])

	useEffect(() => {
		if (query.data != undefined && query.data != {} && query.data != []) {
			if (query.data.length > 0) {
				setFormData(query.data)
				if (query.data?.[0]?.product_code) setValue('quantity', 1)
				if (query.data?.[0]?.name) setValue('name', query.data[0].name)
				if (query.data?.[0]?.description) setValue('description', query.data[0].description)
			} else {
				reset()
			}
		}
	}, [query.data])

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	function onSubmit(data) {
		mutation.mutate(data)
		reset()
		setInputValue('')
	}

	return (
		<>
			<div className="content">
				<div className="form_container">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input__container">
							<label htmlFor="">Patrimônio ou ID </label>
							<input
								type="text"
								id="product_code"
								value={inputValue}
								{...register('product_code', {
									onChange: handleChange,
								})}
							/>
						</div>
						<div className="input__container">
							<label htmlFor="">Modelo </label>
							<input type="text" id="name" disabled {...register('name')} />
						</div>
						<div className="input__container">
							<label htmlFor="">Quantidade </label>
							<input
								type="number"
								id="quantity"
								{...register('quantity')}
								disabled={formData?.[0]?.product_code && formData?.[0]?.product_code != ''}
							/>
						</div>
						<div className="input__container">
							<label htmlFor="">Número do chamado </label>
							<input type="number" id="request_code" {...register('request_code')} />
						</div>
						<div className="input__container">
							<label htmlFor="">Descrição </label>
							<textarea rows={4} id="description" disabled {...register('description')} />
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
