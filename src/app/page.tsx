'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@/app/styles/Dashboard.module.scss';

// Components
import Card from './components/Card';
import Input from './components/Input';
import Button from './components/Button';

// Helpers
import { handleInputChange } from './utils/helpers';

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

export default function Dashboard() {
	const [search, setSearch] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | undefined>('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/users');
				if (!res.ok) {
					// when failed to fetch data, user friendly error message is displayed:
					throw new Error('Something went wrong, please come back later.');
				}
				const userData: User[] = await res.json();
				setUsers(userData);
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchUsers();
	}, []);

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	return (
		<div>
			<div style={{ fontSize: '40px', display: 'flex', padding: '40px', justifyContent: 'center' }}>Users</div>
			<div style={{ display: 'flex', padding: '40px', justifyContent: 'center' }}>
				<Input
					className={styles.searchInput}
					htmlFor={'card-search'}
					type={'search'}
					name={'search'}
					value={search}
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(setSearch, e)}
				/>
				<Button className={styles.searchButton} type={'submit'} text={'Search'} />
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
				{users.map((user: any) => (
					<Card className={styles.card} user={user} key={user.id} />
				))}
			</div>
		</div>
	);
}
