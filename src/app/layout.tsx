import type { Metadata } from 'next';
import '@/app/styles/global.scss';
import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
	title: 'Users Dashboard',
	description: 'Coding Assignment',
};

export const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} `}>{children}</body>
		</html>
	);
}
