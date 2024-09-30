import { ChangeEventHandler, Dispatch, HTMLInputTypeAttribute, ReactNode, SetStateAction } from 'react';
import { User } from './data';

type ClassNameType = string | undefined;

interface ButtonProps {
	type?: 'submit' | 'reset' | 'button' | undefined;
	content?: React.ReactNode;
	className?: ClassNameType;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

interface CardProps {
	cardClass?: ClassNameType;
	categoryClass?: ClassNameType;
	valueClass?: ClassNameType;
	key: User['id'];
	user: User;
	cardCategoryFullName?: ClassNameType;
	fullNameClass?: ClassNameType;
}

interface DropdownProps {
	dropdownClass?: ClassNameType;
	dropdownHeadClass?: ClassNameType;
	text: string | undefined;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
	style?: React.CSSProperties;
	children: ReactNode;
}

interface DropdownListProps {
	dropdownListClass?: ClassNameType;
	dropdownItemClass?: ClassNameType;
	data: User[];
	setSortCategoryName: Dispatch<SetStateAction<string>>;
	acceptedCategories: string[];
	setUserApiData: Dispatch<SetStateAction<User[]>>;
	isAscending: boolean;
	setIsAscending: Dispatch<SetStateAction<boolean>>;
	style?: React.CSSProperties;
}

interface InputProps {
	className?: ClassNameType;
	htmlFor?: string;
	type?: HTMLInputTypeAttribute;
	name?: string;
	value: string | undefined;
	text?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

interface SortingIconProps {
	className?: ClassNameType;
	isAscending: boolean;
}

export type { ButtonProps, CardProps, DropdownProps, DropdownListProps, InputProps, SortingIconProps };
