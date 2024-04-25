export default function OrderBar() {
	return (
		<>
			<select className="order" name="order" id="order" value="Sort By">
				Sort By:
				<option defaultValue="Data/Hora">Data/Hora</option>
				<option value="Quantidade">Quantidade</option>
				<option value="A-Z">A-Z</option>
			</select>
		</>
	)
}
