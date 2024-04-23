import Navbar from '../components/navbar';

export default function RegisterIn() {
	return (
		<>
			<Navbar>
				<div className="forms">
					<label className="productType" htmlFor="productType">
						Tipo Produto
					</label>
					<input className="productInput" type="text" />
				</div>
			</Navbar>
		</>
	);
}
