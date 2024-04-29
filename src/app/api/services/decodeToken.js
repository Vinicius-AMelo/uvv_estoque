import jwt from "jsonwebtoken";

export default function decodeToken(token) {
	return jwt.decode(token, process.env.JWT_SECRET)
}