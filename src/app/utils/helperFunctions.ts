import { Dispatch, SetStateAction, ChangeEvent } from 'react';

// Types
import { User } from '@/types/data';

const handleText = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>): void => {
	stateSetter(e.target.value);
};

const handleUserData = (searchStr: string, stateSetter: Dispatch<SetStateAction<User[]>>, filteredData: User[], apiData: User[]): void => {
	searchStr !== '' ? stateSetter(filteredData) : stateSetter(apiData);
};

const handleButtonClick = (stateSetter: Dispatch<SetStateAction<User[]>>, filteredData: User[]): void => {
	stateSetter(filteredData);
};

const handleDisplay = (isOpen: boolean, stateSetter: Dispatch<SetStateAction<boolean>>) => {
	stateSetter(!isOpen);
};

const handleDefaultName = (isOpen: boolean, categoryName: string, str: string, stateSetter: Dispatch<SetStateAction<string>>) => {
	if (isOpen === false && categoryName !== str) {
		stateSetter(str);
	}
};

// Keeping capitalizeString as a separate function, make it reusable everywhere
const capitalizeString = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const listRequiredCategories = (key: string, stringArray: string[], callback: (str: string) => string): string => {
	if (stringArray.includes(key)) {
		return callback(key);
	}
	return '';
};

const sortUserCards = (userData: User[], category: string, isAscending: boolean = true): User[] => {
	return [...userData].sort((a, b) => {
		let valueA: string | undefined;
		let valueB: string | undefined;

		// This switch statement can be extended later with other categories,
		// like username, website, etc.
		switch (category) {
			case 'Name':
				valueA = a.name;
				valueB = b.name;
				break;
			case 'Email':
				valueA = a.email;
				valueB = b.email;
				break;
			default:
				return 0;
		}

		if (valueA > valueB) {
			return isAscending ? 1 : -1;
		}

		if (valueA < valueB) {
			return isAscending ? -1 : 1;
		}

		return 0;
	});
};

const handleCardSorting = (
	sortFunction: (userData: User[], category: string, isAscending: boolean) => User[],
	userData: User[],
	category: string,
	isAscending: boolean,
	stateSetter: Dispatch<SetStateAction<User[]>>
): void => {
	const sortedUserData = sortFunction(userData, category, isAscending);
	stateSetter(sortedUserData);
};

export {
	handleText,
	handleUserData,
	handleButtonClick,
	handleDisplay,
	handleDefaultName,
	capitalizeString,
	listRequiredCategories,
	sortUserCards,
	handleCardSorting,
};
