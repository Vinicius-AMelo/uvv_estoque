import nodemailer from "nodemailer"
import sharp from "sharp"

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.SENDER_USER,
		pass: process.env.SENDER_PASSWORD,
	},
})


export default async function mailsender(record) {

	const html = `
	<!doctype html>
		<html>
			<head>
				<title>Solicitação de Retirada de Equipamento</title>
				<style>
					* {
						margin: 0px;
						padding: 0px;
						box-sizing: border-box;
						outline: none;
						text-decoration: none;
						font-family: 'Roboto', sans-serif;
						font-style: normal;
						color: inherit;
					}

					body {
						font-family: Arial, sans-serif;
					}

					table {
						border-collapse: collapse;
						width: 600px;
						margin: auto;
					}

					th,
					td {
						padding: 8px;
					}

					th {
						color: black;
					}

					img {
						width: 100%;
						height: auto;
					}

					h1 {
						text-align: center;
						/* color: #2c2663; */
						text-transform: uppercase;
						font-size: 26px;
					}

					.description__table {
						border: 1px solid #dddddd;
					}

					.description__table th,
					.description__table td {
						border: 1px solid #ddd;
						padding: 8px;
					}
				</style>
			</head>

			<body>
				<table>
					<tr>
						<th colspan="2">
							<img src="cid:logo" alt="" />
						</th>
					</tr>
					<tr style="height: 30px"></tr>
					<tr>
						<td>
							<h1>Solicitação de retirada</h1>
						</td>
					</tr>
					<tr style="height: 30px"></tr>

					<table class="description__table">
						<tr>
							<td><strong>Categoria:</strong></td>
							<td>${record.name}</td>
						</tr>
						<tr>
							<td><strong>Modelo:</strong></td>
							<td>${record.description}</td>
						</tr>
						<tr>
							<td><strong>Quantidade: </strong></td>
							<td>${record.quantity}</td>
						</tr>
						<tr>
							<td><strong>Solicitante:</strong></td>
							<td>Vinícius</td>
						</tr>

						<tr style="height: 30px;"></tr>

						<tr style="text-align: center">
							<td colspan="2">
								<strong>Motivo:</strong>
							</td>
						</tr>
						<tr>
							<td rowspan="4" colspan="2" style="height: 80px;">
								Substituição de monitor defeituoso no LAB 4
							</td>
						</tr>
					</table>
					</tr>
				</table>
			</body>
		</html>
	`

	try {
		console.log(`${__dirname + "\\assets\\logo_vertical.png"}`)
		await transporter.sendMail({
			from: '<uvvsender@hotmail.com>',
			to: "cyroback@gmail.com",
			subject: "Retirada de equipamento",
			// text: "Hello world?",
			html,
			attachments: [{
				filename: 'logo_vertical.png',
				path: `${__dirname + "\\assets\\logo_vertical.png"}`,
				cid: 'logo' //same cid value as in the html img src
			}]
		});
		console.log("sended")
	} catch (error) {
		console.log(error)
	}

	// return html
}