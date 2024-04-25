'use client'

import '../../scss/components/recordsForm.scss'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function RecordsForm() {
	const { register, handleSubmit } = useForm()
	const [inputValue, setInputValue] = useState('')
	const [formData, setFormData] = useState({})

	const query = useQuery({
		enabled: false,
		queryKey: ['records'],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:3001/records/in?q=${inputValue}`)
			return response.data
		},
	})

	useEffect(() => {
		if (inputValue != '') {
			query.refetch()
		}
	}, [inputValue])

	useEffect(() => {
		if (query.data != [] && query.data != {}) {
			setFormData(query.data)
		}
	}, [query.data])

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	return (
		<div className="form_container">
			<form action="">
				<div className="input__container">
					<label htmlFor="">Patrimônio </label>
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
					<input type="text" id="name" disabled value={formData?.[0]?.name || ''} {...register('name')} />
				</div>
				<div className="input__container">
					<label htmlFor="">Quantidade </label>
					<input type="number" id="quantity" {...register('quantity')} />
				</div>
				<div className="input__container">
					<label htmlFor="">Descrição </label>
					<textarea
						rows={4}
						id="description"
						disabled
						value={formData?.[0]?.description || ''}
						{...register('description')}
					/>
				</div>
			</form>
		</div>
	)
}
