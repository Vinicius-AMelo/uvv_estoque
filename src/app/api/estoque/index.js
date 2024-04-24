import prisma from "../db.js";

export async function getProducts(req, res) {
	const { q } = req.query;

	if (!q) {
		res.send(await prisma.registroEntradas.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
					}
				}
			}
		}));
	} else {
		const qInt = parseInt(q);
		const records = await prisma.registroEntradas.findMany({
			where: {
				OR: [
					{
						name: {
							contains: q.toLowerCase(),
							mode: "insensitive"
						},
					},
					{
						description: {
							contains: q.toLowerCase(),
							mode: "insensitive"
						},
					},
					{
						product_code: Number.isInteger(qInt) ? qInt : 0,
					},
					{
						id: Number.isInteger(qInt) ? qInt : 0,
					},
				],
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
					}
				}
			}
		});
		res.send(records);
	}
}

export async function createProduct(req, res) {
	const { name, description, product_code, quantity, id } = req.body;

	await prisma.registroEntradas.create({
		data: {
			name,
			description,
			product_code,
			quantity,
			user: {
				connect: {
					id
				}
			},
			estoque: {
				create: {
					name,
					description,
					product_code,
					quantity
				}
			}
		}
	});

	res.sendStatus(201);
}

export async function removeProduct(req, res) {
	const { name, description, product_code, id } = req.body;

	await prisma.registroSaidas.create({
		data: {
			name,
			description,
			product_code,
			quantity,
			user: {
				connect: {
					id
				}
			},
			estoque: {
				create: {
					name,
					description,
					product_code,
					quantity
				}
			}
		}
	});

	res.sendStatus(200);
}