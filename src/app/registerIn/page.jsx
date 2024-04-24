import Container from '../components/container'
import '../../scss/pages/registerIn.scss'

export default function RegisterIn() {
	return (
		<>
			<Container>
				<div className="forms">
					<label className="productType" htmlFor="productType">
						Tipo Produto
					</label>
					<input className="productInput" type="text" />
					<label className="productCode" htmlFor="productCode">
						Patrimônio
					</label>
					<input className="codeInput" type="text" />
					<label className="description" htmlFor="description">
						Descrição
					</label>
					<input className="descriptionInput" type="text" />
				</div>
			</Container>
		</>
	)
}
