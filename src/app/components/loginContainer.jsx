import Image from 'next/image';
import '../../scss/components/loginContainer.scss';
import Logo from '../../../public/Logo.png';
import background from '../../../public/background.jpg';

export default function LoginContainer({ children }) {
	return (
		<>
			<h1 className="header"></h1>
			<div className="container">
				<div className="forms">{children}</div>
				<div className="logo">
					<Image width="683" height="768" src={background} alt="Fundo de tela" className="background" />
					<Image width="300" height="300" src={Logo} alt="UVV logo" className="img" />
				</div>
			</div>
		</>
	);
}
