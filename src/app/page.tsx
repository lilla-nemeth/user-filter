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
import {
	handleText,
	handleUserData,
	handleButtonClick,
	sortUserCards,
	handleCardSorting,
	handleDisplay,
	handleDefaultName,
} from './utils/helperFunctions';
// Types
import { User } from '@/types/data';
import DropdownList from './components/DropdownList';
import SortingIcon from './components/icons/SortingIcon';
// Constants
import { SORT_BY } from '@/types/constants';

const Dashboard: React.FC = () => {
	const [search, setSearch] = useState('');
	const [userAPIData, setUserAPIData] = useState<User[]>([]);
	const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sortCategoryName, setSortCategoryName] = useState<string>(SORT_BY);
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
				const users: User[] = await res.json();
				setUserAPIData(users);
				setFilteredUserData(userAPIData);
			} catch (err) {
				setError((err as Error).message);
			}
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	// Event handler functions
	const handleDropdownClick = (): void => {
		handleDisplay(isOpen, setIsOpen);
		handleDefaultName(isOpen, sortCategoryName, SORT_BY, setSortCategoryName);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		handleText(setSearch, e);
		handleUserData(search, setFilteredUserData, filteredData, userAPIData);
	};

	const returnCards = (data: User[]): React.ReactNode => {
		return (
			<>
				{data.map((user) => (
					<Card
						key={user.id}
						cardClass={styles.card}
						valueClass={styles.cardValues}
						categoryClass={styles.cardCategories}
						fullNameClass={styles.cardFullName}
						cardCategoryFullName={styles.cardCategoryFullName}
						user={user}
					/>
				))}
			</>
		);
	};

	if (error) {
		return <div className='errorCard'>{error}</div>;
	}

	const filteredData = userAPIData.filter((user: User): boolean => {
		const searchToLowerCase = search.toLowerCase();

		return Object.keys(user).some((key: string) => {
			const userValue = user[key as keyof User];

			// if data is not nested
			if (typeof userValue === 'string') {
				return userValue.toString().toLowerCase().includes(searchToLowerCase);
			}

			// if data is nested (like address or company)
			if (typeof userValue === 'object' && userValue !== null) {
				return Object.values(userValue).some((nestedValue: string) => {
					if (typeof nestedValue === 'string') {
						return nestedValue.toString().toLowerCase().includes(searchToLowerCase);
					}
				});
			}
			return false;
		});
	});

	return (
		<div className={styles.contentWrapper}>
			<h1 className='dela-gothic-one'>Users</h1>
			<div className={styles.filterContainer}>
				<div className={styles.searchWrapper}>
					<Input
						className={styles.searchInput}
						htmlFor={'card-search'}
						type={'search'}
						name={'search'}
						value={search}
						onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
					/>
					<Button
						className={styles.searchButton}
						type={'submit'}
						content={'Search'}
						onClick={() => handleButtonClick(setFilteredUserData, filteredData)}
					/>
				</div>
				<div className={styles.sortContainer}>
					<div ref={dropdownRef} className={styles.dropdownWrapper}>
						<Dropdown
							dropdownClass={styles.dropdown}
							dropdownHeadClass={styles.dropdownHead}
							style={isOpen ? { borderRadius: '0.5rem 0.5rem 0 0' } : { borderRadius: '0.5rem' }}
							text={sortCategoryName}
							onClick={handleDropdownClick}
						>
							{isOpen && (
								<DropdownList
									dropdownListClass={styles.dropdownList}
									dropdownItemClass={styles.dropdownItem}
									data={userAPIData}
									setSortCategoryName={setSortCategoryName}
									acceptedCategories={acceptedSortCategories}
									setUserAPIData={setUserAPIData}
									isAscending={isAscending}
									setIsAscending={setIsAscending}
									style={isOpen ? { borderRadius: '0 0 0.5rem 0.5rem ' } : { borderRadius: '0.5rem' }}
								/>
							)}
						</Dropdown>
					</div>
					<div className={styles.orderButtonWrapper}>
						<Button
							className={styles.orderButton}
							disabled={sortCategoryName === SORT_BY}
							type={'button'}
							onClick={() => {
								setIsAscending(!isAscending);
								handleCardSorting(sortUserCards, userAPIData, sortCategoryName, !isAscending, setUserAPIData);
							}}
							content={<SortingIcon className={styles.buttonIcon} isAscending={isAscending} />}
						/>
					</div>
				</div>
			</div>
			<div className={styles.cardWrapper}>{search.length > 1 ? returnCards(filteredData) : returnCards(userAPIData)}</div>
		</div>
	);
};

export default Dashboard;
