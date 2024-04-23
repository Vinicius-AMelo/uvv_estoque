import '../scss/pages/home.scss';
import Container from './components/container';
import RecordsTable from './components/recordsTable';

export default function Home() {
	return (
		<Container>
			<RecordsTable></RecordsTable>
		</Container>
	);
}
