'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
// Styles
import styles from '@/app/styles/Dashboard.module.scss';
// Components
import Input from './components/Input';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Card from './components/Card';
// Helpers
import { handleInputChange, handleButtonClick, sortUserCards, handleCardSort } from './utils/helpers';
// Types
import * as dataTypes from '@/types/data';
import DropdownList from './components/DropdownList';
import AscendingIcon from './components/icons/AscendingIcon';
// Constants
import { SORT_BY } from '@/types/constants';

export default function Dashboard() {
	const [search, setSearch] = useState('');
	const [userAPIData, setUserAPIData] = useState<dataTypes.User[]>([]);
	const [filteredUserData, setFilteredUserData] = useState<dataTypes.User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sortCategoryName, setSortCategoryName] = useState<any>(SORT_BY);
	const [isAscending, setIsAscending] = useState<boolean>(true);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const acceptedSortCategories: string[] = ['name', 'email'];

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

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	const filteredData = userAPIData.filter((user: any) => {
		// address won't work with this option, but other parts are searchable
		return Object.keys(user).some((key: string) => user[key].toString().toLowerCase().includes(search.toLowerCase()));
	});

	const handleDisplay = () => {
		setIsOpen(!isOpen);

		if (isOpen === false) {
			if (sortCategoryName !== SORT_BY) {
				setSortCategoryName(SORT_BY);
			}
		}
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div>
			<h1 className='dela-gothic-one'>Users</h1>
			<div className={styles.filterContainer}>
				<div className={styles.searchWrapper}>
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
				<div ref={dropdownRef} className='dropdownWrapper'>
					<Dropdown dropdownClass='dropdown' dropdownHeadClass='dropdownHead' text={sortCategoryName} onClick={handleDisplay}>
						{isOpen && (
							<DropdownList
								dropdownListClass='dropdownList'
								dropdownItemClass='dropdownItem'
								data={userAPIData}
								setSortCategoryName={setSortCategoryName}
								acceptedCategories={acceptedSortCategories}
								setUserAPIData={setUserAPIData}
								isAscending={isAscending}
								setIsAscending={setIsAscending}
							/>
						)}
					</Dropdown>
				</div>
				<div className='orderButtonWrapper'>
					<Button
						className='orderButton'
						onClick={() => {
							setIsAscending(!isAscending);
							handleCardSort(sortUserCards, userAPIData, sortCategoryName, !isAscending, setUserAPIData);
						}}
						content={<AscendingIcon className='buttonIcon' isAscending={isAscending} />}
					/>
				</div>
			</div>
			<div className={styles.cardContainer}>
				<div className={styles.cardWrapper}>
					{search.length > 1
						? filteredUserData.map((user: any) => {
								return (
									<Card
										cardClass={styles.card}
										valueClass={styles.cardValues}
										categoryClass={styles.cardCategories}
										fullNameClass={styles.cardFullName}
										cardCategoryFullName={styles.cardCategoryFullName}
										user={user}
										key={user.id}
									/>
								);
						  })
						: userAPIData.map((user: any) => {
								return (
									<Card
										cardClass={styles.card}
										valueClass={styles.cardValues}
										categoryClass={styles.cardCategories}
										fullNameClass={styles.cardFullName}
										cardCategoryFullName={styles.cardCategoryFullName}
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
