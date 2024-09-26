'use client';
import { ChangeEvent, useEffect, useState } from 'react';

// Styles
import styles from '@/app/styles/Dashboard.module.scss';

// Components
import Input from './components/Input';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Card from './components/Card';

// Helpers
import { handleInputChange, handleButtonClick } from './utils/helpers';

// Types
import * as dataTypes from '@/types/data';
import DropdownList from './components/DropdownList';
import AscendingIcon from './components/icons/AscendingIcon';

import { SORT_BY } from '@/types/constants';

export default function Dashboard() {
	const [search, setSearch] = useState('');
	const [userAPIData, setUserAPIData] = useState<dataTypes.User[]>([]);
	const [filteredUserData, setFilteredUserData] = useState<dataTypes.User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [display, setDisplay] = useState<string>('none');

	const [sortText, setSortText] = useState<any>(SORT_BY);
	// temporary hard coded category
	const [sortCategory, setSortCategory] = useState<any>('Name');

	const acceptedSortCategories = ['name', 'email'];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/users');
				if (!res.ok) {
					// when failed to fetch data, user friendly error message is displayed:
					throw new Error('Something went wrong, please come back later.');
				}
				const users: dataTypes.User[] = await res.json();

				setUserAPIData(users);
				setFilteredUserData(userAPIData);
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchUsers();
	}, []);

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	const filteredData = userAPIData.filter((user: any) => {
		// address won't work with this option, but other parts are searchable
		return Object.keys(user).some((key: string) => user[key].toString().toLowerCase().includes(search.toLowerCase()));
	});

	const handleDisplay = () => {
		if (display === 'none') {
			setDisplay('block');

			if (sortText !== SORT_BY) {
				setSortText(SORT_BY);
			}
		} else {
			setDisplay('none');
		}
	};

	const handleTextChange = () => {
		setSortText(sortCategory);
	};

	return (
		<div>
			<div className={styles.pageTitle}>Users</div>
			<div className={styles.searchBox}>
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
							setFilteredUserData(userAPIData);
						}
					}}
				/>
				<Button
					className={styles.searchButton}
					type={'submit'}
					content={'Search'}
					onClick={() => handleButtonClick(setFilteredUserData, filteredData)}
				/>
			</div>
			<div className='sortContainer'>
				<div className='dropdownWrapper'>
					<Dropdown dropdownClassName='dropdown' dropdownHeadClassName='dropdownHead' text={sortText} onClick={handleDisplay}>
						<DropdownList
							dropdownListClassName='dropdownList'
							dropdownItemClassName='dropdownItem'
							display={display}
							data={userAPIData}
							onClick={handleTextChange}
							acceptedCategories={acceptedSortCategories}
						/>
					</Dropdown>
				</div>
				<div className='orderButtonWrapper'>
					<Button className='orderButton' content={<AscendingIcon className='buttonIcon' />} />
				</div>
			</div>
			<div className={styles.cardContainer}>
				<div className={styles.cardWrapper}>
					{search.length > 1
						? filteredUserData.map((user: any) => {
								return (
									<Card
										cardClassName={styles.card}
										valueClassName={styles.cardValues}
										categoryClassName={styles.cardCategories}
										user={user}
										key={user.id}
									/>
								);
						  })
						: userAPIData.map((user: any) => {
								return (
									<Card
										cardClassName={styles.card}
										valueClassName={styles.cardValues}
										categoryClassName={styles.cardCategories}
										user={user}
										key={user.id}
									/>
								);
						  })}
				</div>
			</div>
		</div>
	);
}
