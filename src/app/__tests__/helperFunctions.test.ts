import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { capitalizeString, handleText, handleUserData } from '../utils/helperFunctions';
import { User } from '@/types/data';
import { mockApiUsers, mockFilteredUsers } from '../__mocks__/testUsers';

test('capitalizeString', () => {
	expect(capitalizeString('test string')).toBe('Test string');
});

describe('handleText', () => {
	it('should update state with input value', () => {
		const setStateMock = jest.fn();
		const mockEvent = {
			target: {
				value: 'new input value',
			},
		} as ChangeEvent<HTMLInputElement>;

		handleText(setStateMock, mockEvent);
		expect(setStateMock).toHaveBeenCalledWith('new input value');
	});
});

describe('handleUserData', () => {
	it('should call stateSetter with apiData when searchStr is not empty', () => {
		const setStateMock: Dispatch<SetStateAction<User[]>> = jest.fn();

		handleUserData('search', setStateMock, mockFilteredUsers, mockApiUsers);
		expect(setStateMock).toHaveBeenCalledWith(mockFilteredUsers);
	});

	it('should call stateSetter with apiData when searchStr is empty', () => {
		const setStateMock: Dispatch<SetStateAction<User[]>> = jest.fn();

		handleUserData('', setStateMock, mockFilteredUsers, mockApiUsers);
		expect(setStateMock).toHaveBeenCalledWith(mockApiUsers);
	});
});
