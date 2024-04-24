import Link from 'next/link'
import LoginContainer from '../components/loginContainer'

export default function Register() {
	return (
		<>
			<LoginContainer>
				<label className="loginText" htmlFor="loginText">
					REGISTER
				</label>
				<form className="input" action="onSubmit">
					<input className="nameInput" type="text" id="name" name="name" placeholder="  Name" required />
					<input className="emailInput" type="email" id="email" name="email" placeholder="  Email" required />
					<input
						className="passwordInput"
						type="password"
						id="password"
						name="password"
						placeholder="  Password"
						required
					/>
					<Link href={'/login'}>
						<input className="submit" type="submit" value="Sign Up"></input>
					</Link>
				</form>
			</LoginContainer>
		</>
	)
}
