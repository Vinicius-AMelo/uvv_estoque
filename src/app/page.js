import "../scss/pages/home.scss";



async function main() {

}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

export default function Home() {
	return (
		<>

		</>
	);
}
