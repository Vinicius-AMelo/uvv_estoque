'use client'

import '../../scss/components/recordsForm.scss'
import { useForm } from 'react-hook-form'

export default function RecordsIn() {
	const { register, handleSubmit } = useForm()

	return (
		<div className="form_container">
			<form action="">
				<div className="input__container">
					<label htmlFor="">Patrimônio </label>
					<input type="text" id="product_code" {...register('product_code')} />
				</div>
				<div className="input__container">
					<label htmlFor="">Modelo </label>
					<input type="text" id="name" {...register('name')} />
				</div>
				<div className="input__container">
					<label htmlFor="">Quantidade </label>
					<input type="number" id="quantity" {...register('quantity')} />
				</div>
				<div className="input__container">
					<label htmlFor="">Descrição </label>
					<textarea rows={4} id="description" {...register('description')} />
				</div>
			</form>
		</div>
	)
}
