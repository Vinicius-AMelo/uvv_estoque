import bcrypt from "bcrypt";
import prisma from "../db.js";

export async function register(req, res) {
	const { name, email, password } = req.body;
	const saltRounds = 12;

	bcrypt.hash(password, saltRounds, async (error, hash) => {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hash
			}
		});

		res.sendStatus(201);
	});
}

export async function login(req, res) {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	bcrypt.compare(password, user.password, (err, result) => {
		res.send(result);
	});
}


