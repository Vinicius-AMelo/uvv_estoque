import Image from 'next/image';
import '../../scss/pages/login.scss';
import Logo from '../../../public/Logo.png';

export default function Login() {
	return (
		<>
			<Image
				width="300"
				height="300"
				src={Logo}
				alt="UVV logo"
				className="img"
			/>
			<h1 className="header">LOGIN</h1>
			<div className="forms">
				<form action="onSubmit">
					<label className="email" htmlFor="email">
						Email
					</label>
					<input
						className="emailInput"
						type="text"
						id="email"
						name="email"
					/>
					<label className="password" htmlFor="password">
						Password
					</label>
					<input
						className="passwordInput"
						type="text"
						id="password"
						name="password"
					/>
					<input
						className="submit"
						type="submit"
						value="Submit"
					></input>
				</form>
			</div>
		</>
	);
}
