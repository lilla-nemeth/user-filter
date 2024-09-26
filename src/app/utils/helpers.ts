import { Dispatch, SetStateAction, ChangeEvent } from 'react';

// Types
import * as dataTypes from '@/types/data';

const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>): void => {
	stateSetter(e.target.value);
};

const handleButtonClick = (stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>, filteredData: dataTypes.User[]): void => {
	stateSetter(filteredData);
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

const sortUserCards = (userData: dataTypes.User[], category: string, isAscending: boolean = true): dataTypes.User[] => {
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

const handleCardSort = (
	sortFunction: (userData: dataTypes.User[], category: string, isAscending: boolean) => dataTypes.User[],
	userData: dataTypes.User[],
	category: string,
	isAscending: boolean,
	stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>
): void => {
	const sortedUserData = sortFunction(userData, category, isAscending);
	stateSetter(sortedUserData);
};

export { handleInputChange, handleButtonClick, capitalizeString, listRequiredCategories, sortUserCards, handleCardSort };
