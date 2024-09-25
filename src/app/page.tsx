import styles from '@/app/styles/Dashboard.module.scss';

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
			{users.map((user: any) => (
				<ul className={styles.card} key={user.id} style={{ margin: '30px', padding: '10px', display: 'flex' }}>
					<ul style={{ display: 'flex', flexDirection: 'column', color: 'green', paddingRight: '10px' }}>
						<li>Name:</li>
						<li>Email:</li>
						<li>Phone:</li>
						<li>Website:</li>
						<li>Address:</li>
					</ul>
					<ul style={{ display: 'flex', flexDirection: 'column' }}>
						<li>{user.name}</li>
						<li>{user.email}</li>
						<li>{user.phone}</li>
						<li>{user.website}</li>
						<li>{user.address.street}</li>
						<li>{user.address.suite}</li>
						<li>{user.address.city}</li>
						<li>{user.address.city}</li>
						<li>{user.address.zipcode}</li>
						<li>{user.address.geo.lat}</li>
						<li>{user.address.geo.lng}</li>
					</ul>
				</ul>
			))}
		</div>
	);
}
