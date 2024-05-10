'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import '../../scss/components/recordsForm.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Logo from '../../../public/Logo.png'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Popup from './popup'

export default function RecordsIn() {
	const { register, reset, handleSubmit, setValue } = useForm()
	const [checkboxValue, setcheckboxValue] = useState(true)
	const [token, setToken] = useState('')
	const [showPopup, setShowPopup] = useState(false)
	const [_options, setOptions] = useState([])
	const [selected, setSelected] = useState(false)
	const _nameCount = {}

	const query = useQuery({
		queryKey: ['searchIn'],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/records/stock?code=0`)
			return response.data
		},
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			const { name, description, quantity, product_code, product_id, checkbox } = data
			const response = await axios.post(
				'http://10.1.1.19:3001/records/in',
				{
					name,
					description,
					quantity: checkbox ? 1 : parseInt(quantity),
					product_code: parseInt(product_code) || 0,
					product_id: parseInt(product_id) || null,
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
			query.refetch()
		},
	})

	useEffect(() => {
		if (mutation.data != undefined) {
			if (mutation.data == 'Created') reset()
			if (mutation.data.message) {
				setShowPopup({ message: 'Patrimônio já em estoque', color: 'red' })
				setTimeout(() => {
					setShowPopup(false)
				}, 4000)
			}
		}
	}, [mutation.data])

	useEffect(() => {
		const tokenStorage = localStorage.getItem('uat_cs1')
		if (!tokenStorage) return
		const { token } = JSON.parse(tokenStorage)
		setToken(token)
	}, [])

	useEffect(() => {
		if (query.data != [] && query.data != {} && query.data != undefined) {
			setOptions(query.data)
		}
	}, [query.data])

	function onSubmit(data) {
		mutation.mutate(data)
	}

	function handleChange(event) {
		setcheckboxValue(event.target.checked)
	}

	function _handleClick(data) {
		setSelected(true)
		setValue('product_code', '-')
		setValue('description', data.description)
		setValue('name', data.name)
		setValue('product_id', data.id)
	}

	function handleInput() {
		if (selected) {
			setSelected(false)
			reset()
			reset({ product_id: '' })
		}
	}

	return (
		<>
			<div className="content">
				<div className="form_container">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input__container--check">
							<label>Produto possui patrimônio?</label>
							<label className="switch" htmlFor="checkbox">
								<input type="checkbox" id="checkbox" {...register('checkbox', { onChange: handleChange })} checked={checkboxValue} />
								<div className="slider round"></div>
							</label>
						</div>
						<div className="input__container">
							<label htmlFor="">Patrimônio {checkboxValue && <b style={{ color: 'red' }}>*</b>}</label>
							<input type="text" id="product_code" disabled={!checkboxValue} {...register('product_code', { required: checkboxValue })} />
						</div>
						<div className="input__container">
							<label htmlFor="">
								Categoria <b style={{ color: 'red' }}>*</b>
							</label>
							<input type="text" id="name" autoComplete="off" onInput={handleInput} {...register('name', { required: true })} />
						</div>
						<div className="input__container">
							<label htmlFor="">Quantidade {!checkboxValue && <b style={{ color: 'red' }}>*</b>}</label>
							<input type="number" id="quantity" disabled={checkboxValue} {...register('quantity', { required: !checkboxValue })} />
						</div>
						<div className="input__container">
							<label htmlFor="">
								Modelo <b style={{ color: 'red' }}>*</b>
							</label>
							<textarea rows={4} id="description" {...register('description', { required: true })} />
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
