'use client'

import '../../scss/components/recordsForm.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Logo from '../../../public/Logo.png'
import Image from 'next/image'
import Popup from './popup'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function RecordsForm() {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm()
	const [inputValue, setInputValue] = useState('')
	const [formData, setFormData] = useState({})
	const [token, setToken] = useState('')
	const [showPopup, setShowPopup] = useState(false)
	const [maxValue, setMaxValue] = useState(1)
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const id = searchParams.get('id')

	const query = useQuery({
		enabled: false,
		queryKey: ['searchOut'],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/records/stock?${id == null ? 'code=' + inputValue : 'id=' + id}`)
			return response.data
		},
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data)
			const { name, description, quantity, product_code, request_code, product_id } = data
			const response = await axios.post(
				'http://10.1.1.19:3001/records/out',
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
		onSuccess: () => {
			setShowPopup({ message: 'Sucesso! Novo registro salvo.', color: 'green' })
			setTimeout(() => {
				setShowPopup(false)
			}, 4000)
		},
	})

	useEffect(() => {
		const tokenStorage = localStorage.getItem('uat_cs1')
		if (!tokenStorage) return
		const { token } = JSON.parse(tokenStorage)
		setToken(token)
	}, [])

	useEffect(() => {
		if (inputValue != '') query.refetch()
		else if (id != null) setInputValue(id)
		else reset()
	}, [inputValue, id])

	useEffect(() => {
		if (query.data != undefined && query.data != {} && query.data != []) {
			if (query.data.length > 0) {
				if (query.data[0].product_code == 0) {
					setMaxValue(query.data[0].quantity)
					setValue('quantity', null)
				}
				if (query.data[0].name) setValue('name', query.data[0].name)
				if (query.data[0].description) setValue('description', query.data[0].description)
				if (query.data[0].id) setValue('product_id', query.data[0].id)
				if (query.data[0].product_code != 0) setValue('quantity', 1)
				setFormData(query.data)
			} else {
				reset()
			}
		}
	}, [query.data])

	function handleChange(event) {
		if (id != null) {
			router.push(pathname)
			reset()
			setInputValue('')
		} else setInputValue(event.target.value)
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
							<label htmlFor="">
								Patrimônio ou ID <b style={{ color: 'red' }}>*</b>
							</label>
							<input
								type="text"
								id="product_code"
								value={inputValue}
								{...register('product_code', {
									onChange: handleChange,
									required: true,
								})}
							/>
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
								disabled={formData?.[0]?.product_code && formData?.[0]?.product_code != ''}
							/>
							{errors.quantity && <p>{errors.quantity.message}</p>}
						</div>
						<div className="input__container">
							<label htmlFor="">Número do chamado </label>
							<input type="number" id="request_code" {...register('request_code')} />
						</div>
						<div className="input__container">
							<label htmlFor="">Motivo da baixa </label>
							<textarea rows={4} type="number" id="out_reason" {...register('out_reason')} />
						</div>
						<div className="input__container">
							<label htmlFor="">Modelo </label>
							<textarea rows={4} id="description" disabled {...register('description')} />
						</div>
						<input type="hidden" id="product_id" {...register('product_id')} />
						<button type="submit">ENVIAR</button>
					</form>
				</div>
				<div className="logo">
					<Image width="250" height="250" src={Logo} alt="UVV logo" className="img" />
				</div>
			</div>
			{showPopup && <Popup message={showPopup.message} color={showPopup.color}></Popup>}
		</>
	)
}
