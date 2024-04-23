import { Inter } from "next/font/google";
import "./globals.scss";
import { ReactQueryClientProvider } from "./components/ReactQueryClienteProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				{/* <ReactQueryClientProvider> */}
				{children}
				{/* </ReactQueryClientProvider> */}
			</body>
		</html>
	);
}
