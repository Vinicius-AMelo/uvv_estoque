import Image from 'next/image';
import logo from '../../../../public/Logo.png';

export default function Header() {
	return (
		<header>
			<Image src={logo} />
			<div className="container"></div>
		</header>
	);
}
