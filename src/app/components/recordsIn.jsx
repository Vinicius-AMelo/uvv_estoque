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
	const [checkboxValue, setCheckboxValue] = useState(true)
	const [formData, setFormData] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const [token, setToken] = useState('')
	const [showPopup, setShowPopup] = useState(false)
	const [selected, setSelected] = useState(false)
	const [categoryValue, setCategoryValue] = useState('')
	const [autoSuggested, setAutoSuggested] = useState('')
	const [nameCount, setNameCount] = useState({})

	const query = useQuery({
		enabled: false,
		queryKey: ['searchIn'],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/records/stock?${checkboxValue ? 'product_code=' + inputValue : 'id=' + inputValue}`)
			return response.data
		},
	})

	const optionsQuery = useQuery({
		queryKey: ['searchOptions'],
		queryFn: async () => {
			const response = await axios.get(`http://10.1.1.19:3001/records/stock`)
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
					product_code: checkbox ? parseInt(product_code) || 0 : 0,
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
			setFormData(null)
			reset()
			// query.refetch()
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
		if (query.data != undefined && query.data != {} && query.data != []) {
			if (query.data.length > 0) {
				setFormData(query.data[0])
			} else {
				reset()
			}
		}
	}, [query.data])

	useEffect(() => {
		if (optionsQuery.data != [] && optionsQuery.data != {} && optionsQuery.data != undefined) {
			optionsQuery.data.map((item) => {
				const lowerName = item.name.toLowerCase()
				if (!nameCount[lowerName]) nameCount[lowerName] = true
			})
		}
	}, [optionsQuery.data])

	useEffect(() => {
		if (categoryValue != '') {
			const optionsArr = Object.keys(nameCount).filter((option) => {
				if (option.includes(categoryValue.toLowerCase())) return true
				return false
			})

			if (optionsArr.length == 1) setAutoSuggested(optionsArr[0])
			else setAutoSuggested(null)
		}
	}, [optionsQuery.data, nameCount, categoryValue])

	function onSubmit(data) {
		mutation.mutate(data)
	}

	function handleChange(event) {
		setCheckboxValue(event.target.checked)
	}

	useEffect(() => {
		if (inputValue != '') query.refetch()
		else {
			setFormData(null)
			reset()
			setCategoryValue('')
			setAutoSuggested(null)
		}
	}, [inputValue])

	useEffect(() => {
		if (formData != null) {
			setValue('description', formData.description)
			setValue('name', formData.name)
			setValue('product_id', formData.id)
			if (checkboxValue) setValue('quantity', 1)
		}
	}, [formData])

	function handleInput() {
		if (selected) {
			setSelected(false)
			reset()
			reset({ product_id: '' })
		}
	}

	function handleInputValue(event) {
		setInputValue(event.target.value)
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
							<label htmlFor="">
								{checkboxValue ? (
									<>
										Patrimônio <b style={{ color: 'red' }}>*</b>
									</>
								) : (
									'ID'
								)}
							</label>
							<input
								type="text"
								id="product_code"
								value={inputValue}
								{...register('product_code', { required: checkboxValue, onChange: handleInputValue })}
							/>
						</div>
						<div className="input__container">
							<label htmlFor="">
								Categoria <b style={{ color: 'red' }}>*</b>
							</label>
							<input
								type="text"
								id="name"
								className="category"
								autoComplete="off"
								onInput={handleInput}
								value={categoryValue}
								disabled={formData != null}
								onKeyDown={(event) => {
									if (event.key == 'Tab' && autoSuggested) {
										// event.preventDefault()
										setCategoryValue(autoSuggested)
									}
								}}
								{...register('name', { required: true, onChange: (event) => setCategoryValue(event.target.value) })}
							/>
							{autoSuggested && (
								<div className="suggestion">
									{autoSuggested.split('').map((char, index) => (
										<span className={index < categoryValue.length ? 'hide' : ''} key={index}>
											{char}
										</span>
									))}
								</div>
							)}
						</div>
						<div className="input__container">
							<label htmlFor="">Quantidade {!checkboxValue && <b style={{ color: 'red' }}>*</b>}</label>
							<input type="number" id="quantity" disabled={checkboxValue} {...register('quantity', { required: !checkboxValue })} />
						</div>
						<div className="input__container">
							<label htmlFor="">
								Modelo <b style={{ color: 'red' }}>*</b>
							</label>
							<textarea rows={4} id="description" disabled={formData != null} {...register('description', { required: true })} />
						</div>
						<input type="hidden" id="product_id" {...register('product_id')} />
						<button type="submit">
							{!mutation.isPending && 'ENVIAR'}
							{mutation.isPending && <span className="loading"></span>}
						</button>
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
