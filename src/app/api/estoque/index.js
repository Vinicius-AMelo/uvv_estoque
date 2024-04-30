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
				},
				orderBy: {
					createdAt: "desc"
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
				},
				orderBy: {
					createdAt: "desc"
				}
			});
			res.send(records);

		}
	} catch (error) {
		res.send(error)
	}
}

export async function createInRecord(req, res) {
	try {
		const { id } = decodeToken(req.headers.authorization)
		const { name, description, product_code, quantity, product_id } = req.body;

		const query = {};
		if (product_id) query.id = product_id;
		else query.product_code = product_code || 999999999;

		const existingProduct = await prisma.estoque.findFirst({ where: query });

		if (existingProduct) {
			if ((existingProduct.product_code != 0 && existingProduct.quantity == 0) || existingProduct.product_code == 0) {
				await prisma.estoque.update({
					where: {
						id: existingProduct.id
					},
					data: {
						quantity: {
							increment: quantity
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
		res.status(400).send({ message: "Erro", error: error.message.replace(/\s+/g, ' ') })
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
				},
				orderBy: {
					createdAt: "desc"
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
				},
				orderBy: {
					createdAt: "desc"
				}
			});
			res.send(records);
		}
	} catch (error) {
		res.status(400).send({ message: "Erro", error: error.message.replace(/\s+/g, ' ') })
	}

}

export async function createOutRecord(req, res) {
	try {
		const { id } = decodeToken(req.headers.authorization)
		const { name, description, product_code, product_id, quantity, request_code } = req.body;
		const existingProduct = await prisma.estoque.findFirst({
			where: {
				id: product_id
			}
		});

		await prisma.estoque.update({
			where: {
				id: existingProduct.id
			},
			data: {
				quantity: {
					decrement: quantity
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
	} catch (error) {
		res.status(400).send({ message: "Erro", error: error.message.replace(/\s+/g, ' ') })
	}
}


export async function getStock(req, res) {
	try {
		const { code } = req.query;
		if (!code) {
			res.send(await prisma.estoque.findMany());
		} else {
			const codeInt = parseInt(code);
			const records = await prisma.estoque.findMany({
				where: {
					OR: [
						{
							product_code: Number.isInteger(codeInt) ? codeInt : 0,
						},
						{
							id: Number.isInteger(codeInt) ? codeInt : 0,
						}
					]
				},
				orderBy: {
					name: "asc"
				}
			});
			res.send(records);

		}
	} catch (error) {
		res.status(400).send({ message: "Erro", error: error.message.replace(/\s+/g, ' ') })
	}
}