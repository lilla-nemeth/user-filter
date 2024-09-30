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
	fetchUsers,
} from './utils/helperFunctions';
// Types
import { User } from '@/types/data';
import DropdownList from './components/DropdownList';
import SortingIcon from './components/icons/SortingIcon';
// Constants
import { SORT_BY } from '@/types/constants';

const Dashboard: React.FC = () => {
	const [search, setSearch] = useState('');
	const [userApiData, setUserApiData] = useState<User[]>([]);
	const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sortCategoryName, setSortCategoryName] = useState<string>(SORT_BY);
	const [isAscending, setIsAscending] = useState<boolean>(true);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const acceptedSortCategories: string[] = ['name', 'email'];

	useEffect(() => {
		fetchUsers(setUserApiData, userApiData, setFilteredUserData, setError);
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
		handleUserData(search, setFilteredUserData, filteredData, userApiData);
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

	const filteredData = userApiData.reduce((acc: User[], user: User): User[] => {
		const searchToLowerCase = search.toLowerCase();

		const matches = Object.keys(user).some((key) => {
			const userValue = user[key as keyof User];

			// Check if it's a string
			if (typeof userValue === 'string') {
				return userValue.toLowerCase().includes(searchToLowerCase);
			}

			// Check if it's an object
			if (typeof userValue === 'object' && userValue !== null) {
				return Object.values(userValue).some((nestedValue) => {
					return typeof nestedValue === 'string' && nestedValue.toLowerCase().includes(searchToLowerCase);
				});
			}

			return false;
		});

		if (matches) {
			acc.push(user);
		}

		return acc;
	}, []);

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
									data={userApiData}
									setSortCategoryName={setSortCategoryName}
									acceptedCategories={acceptedSortCategories}
									setUserApiData={setUserApiData}
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
								handleCardSorting(sortUserCards, userApiData, sortCategoryName, !isAscending, setUserApiData);
							}}
							content={<SortingIcon className={styles.buttonIcon} isAscending={isAscending} />}
						/>
					</div>
				</div>
			</div>
			<div className={styles.cardWrapper}>{search.length > 1 ? returnCards(filteredData) : returnCards(userApiData)}</div>
		</div>
	);
};

export default Dashboard;
