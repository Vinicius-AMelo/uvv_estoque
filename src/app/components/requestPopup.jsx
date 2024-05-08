'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../scss/components/recordsForm.scss'

export default function RequestPopup({ recordId, showRequestPopup }) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm()
	const [formData, setFormData] = useState({})
	const [token, setToken] = useState('')

	const [maxValue, setMaxValue] = useState(1)

	const query = useQuery({
		// enabled: false,
		queryKey: ['searchOut'],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/records/stock?id= + ${recordId}`)
			return response.data
		},
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { name, description, quantity, product_code, request_code, product_id } = data
			const response = await axios.post(
				'http://10.1.1.19:3001/request',
				{
					name,
					description,
					quantity: parseInt(quantity),
					product_code: parseInt(product_code),
					request_code: parseInt(request_code),
					product_id: parseInt(product_id),
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

	useEffect(() => {
		if (query.data != undefined && query.data != {} && query.data != []) {
			if (query.data.length > 0) {
				if (query.data[0].product_code == 0) {
					setMaxValue(query.data[0].quantity)
					setValue('quantity', null)
				}
				if (query.data[0].name) setValue('name', query.data[0].name)
				if (query.data[0].description) setValue('description', query.data[0].description)
				if (query.data[0].id) setValue('product_code', query.data[0].id)
				if (query.data[0].product_code != 0) setValue('quantity', 1)
				setFormData(query.data[0])
			} else {
				reset()
			}
		}
	}, [query.data])

	function onSubmit(data) {
		// mutation.mutate(data)
		reset()
		showRequestPopup(null)
	}

	return (
		<>
			<div className="popup__container">
				<div className="content">
					<div className="form_container">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="input__container">
								<label htmlFor="">
									Patrimônio ou ID <b style={{ color: 'red' }}>*</b>
								</label>
								<input type="text" id="product_code" disabled {...register('product_code', { required: true })} />
							</div>
							<div className="input__container">
								<label htmlFor="">Categoria </label>
								<input type="text" id="name" disabled {...register('name', { required: true })} />
							</div>
							<div className="input__container">
								<label htmlFor="">
									Quantidade <b style={{ color: 'red' }}>*</b>
								</label>
								<input
									type="number"
									id="quantity"
									className={errors.quantity && 'error'}
									{...register('quantity', {
										max: { value: maxValue, message: `Quantidade em estoque: ${maxValue}` },
										min: { value: 1 },
										required: 'Campo não pode ficar em branco',
									})}
									disabled={formData.product_code && formData.product_code != ''}
								/>
								{errors.quantity && <p>{errors.quantity.message}</p>}
							</div>
							<div className="input__container">
								<label htmlFor="">Número do chamado </label>
								<input type="number" id="request_code" {...register('request_code')} />
							</div>
							<div className="input__container">
								<label htmlFor="">Modelo </label>
								<textarea rows={4} id="description" disabled {...register('description')} />
							</div>
							<input type="hidden" id="product_id" {...register('product_id')} />
							<div className="buttons">
								<button type="submit">ENVIAR</button>
								<button type="button" className="cancel__button">
									CANCELAR
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="overlay"></div>
		</>
	)
}
