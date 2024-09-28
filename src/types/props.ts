import { User } from './data';

type classNameType = string | undefined;

interface ButtonProps {
	type?: 'submit' | 'reset' | 'button' | undefined;
	content?: React.ReactNode;
	className?: classNameType;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

interface CardProps {
	cardClass?: classNameType;
	categoryClass?: classNameType;
	valueClass?: classNameType;
	key: User['id'];
	user: User;
	cardCategoryFullName: classNameType;
	fullNameClass?: classNameType;
}

export type { ButtonProps, CardProps };
