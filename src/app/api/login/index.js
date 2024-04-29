import bcrypt from "bcrypt";
import prisma from "../db.js";
import jwt from "jsonwebtoken"

export async function register(req, res) {
	try {
		const { name, email, password } = req.body;
		const role = req.body?.role || "DEFAULT"
		const saltRounds = 12;

		bcrypt.hash(password, saltRounds, async (error, hash) => {
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hash,
					role
				}
			});

			res.sendStatus(201);
		});
	} catch (error) {
		res.status(400).send({ message: "Falha na autenticação", error })
	}
}

export async function login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email
			},
		});

		bcrypt.compare(password, user.password, (err, result) => {
			if (err) return res.send({ message: "Ocorreu um problema", err })
			if (!result) return res.send({ message: "Credenciais invalidas" })

			const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, "uvvAuthLogin", { expiresIn: '1h' })
			res.send({ token, user: { id: user.id, name: user.name, email: user.email } })
		});
	} catch (error) {
		res.status(400).send({ message: "Falha na validação", error })
	}
}

export async function validateToken(req, res, next) {
	try {
		const token = req.headers.authorization
		if (!token) return res.send({ message: "Token não enviado!" })

		jwt.verify(token, "uvvAuthLogin", (err, decoded) => {
			if (err) return res.send({ message: "Usuário não autenticado!" })
			req.user = decoded;
			next()
		})
	} catch (error) {
		res.status(400).send({ message: "Falha na validação", error })
	}
}
export async function auth(req, res) {
	try {
		const { user } = req
		if (!user) return res.send({ valid: false })
		return res.send({ valid: true })
	} catch (error) {
		res.status(400).send({ message: "Falha na autenticação", error })
	}
}


