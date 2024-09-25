import styles from '@/app/styles/Dashboard.module.scss';
import Card from './components/Card';

interface UserLocation {
	lat: string;
	lng: string;
}

interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: UserLocation[];
}

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	website: string;
	address: UserAddress[];
}

export default async function Dashboard() {
	let users: User[] = [];
	let error: string | undefined;

	try {
		const res = await fetch('http://localhost:3000/api/users');
		if (!res.ok) {
			// when failed to fetch data, user friendly error message is displayed:
			throw new Error('Something went wrong, please come back later.');
		}
		users = await res.json();
	} catch (err) {
		error = (err as Error).message;
	}

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	return (
		<div>
			<div style={{ fontSize: '40px', display: 'flex', padding: '10px', justifyContent: 'center' }}>Users</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
				{users.map((user: any) => (
					<Card className={styles.card} user={user} key={user.id} />
				))}
			</div>
		</div>
	);
}
