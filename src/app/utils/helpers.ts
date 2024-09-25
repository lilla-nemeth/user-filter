import { Dispatch, SetStateAction, ChangeEvent } from 'react';

// Types
import * as dataTypes from '@/types/data';

const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>) => {
	stateSetter(e.target.value);
};

const handleButtonClick = (stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>, filteredData: dataTypes.User[]) => {
	stateSetter(filteredData);
};

export { handleInputChange, handleButtonClick };
