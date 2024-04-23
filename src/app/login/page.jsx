import Image from 'next/image';
import '../../scss/pages/login.scss';
import Logo from '../../../public/Logo.png';
import background from '../../../public/background.jpg';

export default function Login() {
	return (
		<>
			<h1 className="header"></h1>
			<div className="container">
				<div className="forms">
					<label className="loginText" htmlFor="loginText">
						LOGIN
					</label>
					<form action="onSubmit">
						<input
							className="emailInput"
							type="text"
							id="email"
							name="email"
							placeholder="  Email"
						/>
						<input
							className="passwordInput"
							type="text"
							id="password"
							name="password"
							placeholder="  Password"
						/>
						<input
							className="submit"
							type="submit"
							value="Sign In"
						></input>
						<label className="created" htmlFor="created">
							Cadastrar Colaborador
						</label>
					</form>
				</div>
				<div className="logo">
					<Image
						width="683"
						height="768"
						src={background}
						alt="Fundo de tela"
						className="background"
					/>
					<Image
						width="300"
						height="300"
						src={Logo}
						alt="UVV logo"
						className="img"
					/>
				</div>
			</div>
		</>
	);
}
