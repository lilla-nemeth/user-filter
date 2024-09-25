import type { Metadata } from 'next';
import '@/app/styles/global.scss';

export const metadata: Metadata = {
	title: 'Users Dashboard',
	description: 'Coding Assignment',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
