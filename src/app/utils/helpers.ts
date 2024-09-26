import { Dispatch, SetStateAction, ChangeEvent } from 'react';

// Types
import * as dataTypes from '@/types/data';

const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>): void => {
	stateSetter(e.target.value);
};

const handleButtonClick = (stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>, filteredData: dataTypes.User[]): void => {
	stateSetter(filteredData);
};

const listRequiredCategories = (key: string, stringArray: string[]): string => {
	if (stringArray.includes(key)) {
		return key.charAt(0).toUpperCase() + key.slice(1);
	}
	return '';
};

const handleCardSort = (userData: dataTypes.User[], category: string, stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>): void => {
	const sortedUserData = [...userData].sort((a, b) => {
		const string = Object.keys(a)
			.filter((el) => el === 'name')
			.join('');
		const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);

		if (category.localeCompare(capitalizedString) === 0) {
			if (a.name > b.name) {
				return 1;
			}

			if (a.name < b.name) {
				return -1;
			}

			return 0;
		}

		return 0;
	});

	stateSetter(sortedUserData);
};

export { handleInputChange, handleButtonClick, listRequiredCategories, handleCardSort };
