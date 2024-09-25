'use client';
import { ChangeEvent, useEffect, useState } from 'react';

// Styles
import styles from '@/app/styles/Dashboard.module.scss';

// Components
import Card from './components/Card';
import Input from './components/Input';
import Button from './components/Button';

// Helpers
import { handleInputChange, handleButtonClick } from './utils/helpers';

// Types
import * as dataTypes from '@/types/data';

export default function Dashboard() {
	const [search, setSearch] = useState('');
	const [userData, setUserData] = useState<dataTypes.User[]>([]);
	const [filteredUserData, setFilteredUserData] = useState<dataTypes.User[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/users');
				if (!res.ok) {
					// when failed to fetch data, user friendly error message is displayed:
					throw new Error('Something went wrong, please come back later.');
				}
				const users: dataTypes.User[] = await res.json();

				setUserData(users);
				setFilteredUserData(userData);
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchUsers();
	}, []);

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	const filteredData = userData.filter((user: any) => {
		// address won't work with this option, but other parts are searchable
		return Object.keys(user).some((key: string) => user[key].toString().toLowerCase().includes(search.toLowerCase()));
	});

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
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						handleInputChange(setSearch, e);

						if (search !== '') {
							setFilteredUserData(filteredData);
						} else {
							setFilteredUserData(userData);
						}
					}}
				/>
				<Button
					className={styles.searchButton}
					type={'submit'}
					text={'Search'}
					onClick={() => handleButtonClick(setFilteredUserData, filteredData)}
				/>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
				{search.length > 1
					? filteredUserData.map((user: any) => {
							return <Card className={styles.card} user={user} key={user.id} />;
					  })
					: userData.map((user: any) => {
							return <Card className={styles.card} user={user} key={user.id} />;
					  })}
			</div>
		</div>
	);
}
