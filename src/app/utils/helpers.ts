import { Dispatch, SetStateAction, ChangeEvent } from 'react';

const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>) => {
	stateSetter(e.target.value);
};

export { handleInputChange };
