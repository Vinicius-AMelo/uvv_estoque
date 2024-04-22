import "../scss/pages/home.scss";

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
	await prisma.estoque.create({
		data: {
			name: "Monitor",
			description: "27pol",
			product_code: 2524,
			registroEntradas: {
				create: {
					name: "Monitor",
				}
			}
		}
	})

	const registros = await prisma.registroEntradas.findMany({
		include: {
			estoque: true,
		}
	})

	console.log(registros)
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
