import Link from 'next/link';
import LoginContainer from '../components/loginContainer';

export default function Login() {
	return (
		<>
			<LoginContainer>
				<label className="loginText" htmlFor="loginText">
					LOGIN
				</label>
				<form className="inuput" action="onSubmit">
					<input className="emailInput" type="email" id="email" name="email" placeholder="  Email" />
					<input
						className="passwordInput"
						type="password"
						id="password"
						name="password"
						placeholder="  Password"
					/>
					<input className="submit" type="submit" value="Sign In"></input>
					<p className="created" htmlFor="created">
						<Link href="/register">Ainda não tem cadastro?</Link>
					</p>
				</form>
			</LoginContainer>
		</>
	);
}
