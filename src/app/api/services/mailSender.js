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


export default async function mailsender(record, user) {

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
						/* border-collapse: collapse; */
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

					h1 {
						text-align: center;
						/* color: #2c2663; */
						text-transform: uppercase;
						font-size: 26px;
					}

					.content {
						/* border: 1px solid #dddddd; */
					}


					.description__table th,
					.description__table td {
						/* border: 1px solid #dddddd; */
						padding: 8px;
					}

					.description__table tr:nth-child(odd) {
						background-color: #FAFAFA !important;
					}

					.description__table tr:nth-child(even) {
						background-color: #dedede !important;
					}

					.logo_container {
						height: 80px;
						background-color: #FAFAFA;
					}

					.logo_container img {
						width: auto;
						height: 100%;
					}

					a {
						margin: auto;
						background-color: #2c2663;
						padding: 16px 16px;
						text-align: center;
						color: #ffffff !important;
						border-radius: 4px;
						display: inline-block;
					}
			
					.button_out {
						text-align: center;
					}
				</style>
			</head>

			<body>
				<table>
					<tr>
						<th colspan="2" class=" logo_container">
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

					<tr>
						<td>
							<table class=" description__table">

								<tr class="content">
									<td><strong>Categoria:</strong></td>
									<td>${record.name}</td>
								</tr>
								<tr class="content">
									<td><strong>Modelo:</strong></td>
									<td>${record.description}</td>
								</tr>
								<tr class="content">
									<td><strong>Quantidade: </strong></td>
									<td>${record.quantity}</td>
								</tr>
								<tr class="content">
									<td><strong>Solicitante:</strong></td>
									<td>${user}</td>
								</tr>
								<tr class="content">
									<td><strong>Número do chamado:</strong></td>
									<td>${record.request_code}</td>
								</tr>

								<tr style="height: 15px;"></tr>
								<tr style="height: 15px;"></tr>

								<tr style="text-align: center">
									<td colspan="2">
										<strong>Motivo:</strong>
									</td>
								</tr>
								<tr>
									<td rowspan="4" colspan="2" style="height: 80px;">
										${record.out_reason}
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr class=" button_out">
						<td>
							<a href=http://estoquedti/recordsout?id=${record.product_id}>Realizar baixa</a>
						</td>
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
			// to: process.env.DIEGUITO,
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