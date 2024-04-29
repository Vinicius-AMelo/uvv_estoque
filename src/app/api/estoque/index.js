import prisma from "../db.js";
import decodeToken from "../services/decodeToken.js";

export async function getInRecords(req, res) {
	try {
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
	} catch (error) {
		res.send(error)
	}
}

export async function createInRecord(req, res) {
	const { id } = decodeToken(req.headers.authorization)
	try {
		const { name, description, product_code, quantity } = req.body;

		const existingProduct = await prisma.estoque.findFirst({
			where: {
				product_code: product_code
			}
		});

		if (existingProduct) {
			if (existingProduct.quantity == 0) {
				await prisma.estoque.update({
					where: {
						id: existingProduct.id
					},
					data: {
						quantity: {
							increment: 1
						},
						registroEntradas: {
							create: {
								name,
								description,
								product_code,
								quantity,
								user: {
									connect: {
										id
									}
								},
							}
						}
					}
				});
				res.sendStatus(201);
			} else {
				res.send({ message: "Item já existe em estoque" })
			}
		} else {
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
	} catch (error) {
		res.status(400).send({ message: "Falha na autenticação", error })
	}
}

export async function getOutRecords(req, res) {
	try {
		const { q } = req.query;

		if (!q) {
			res.send(await prisma.registroSaidas.findMany({
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
			const records = await prisma.registroSaidas.findMany({
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
	} catch (error) {
		res.status(400).send({ message: "Falha na autenticação", error })
	}

}

export async function createOutRecord(req, res) {
	const { id } = decodeToken(req.headers.authorization)
	const { name, description, product_code, quantity, request_code } = req.body;

	const existingProduct = await prisma.estoque.findFirst({
		where: {
			product_code: product_code
		}
	});

	await prisma.estoque.update({
		where: {
			id: existingProduct.id
		},
		data: {
			quantity: {
				decrement: 1
			},
			registroSaidas: {
				create: {
					name,
					description,
					product_code,
					quantity,
					request_code,
					user: {
						connect: {
							id
						}
					},
				}
			}
		}
	});

	res.sendStatus(200);

}