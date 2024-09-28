import { DropdownProps } from '@/types/props';

const Dropdown: React.FC<DropdownProps> = (props) => {
	const { dropdownClass, dropdownHeadClass, text, onClick, style } = props;

	return (
		<div className={dropdownClass} onClick={onClick}>
			<div className={dropdownHeadClass} style={style}>
				{text}
			</div>
			{props.children}
		</div>
	);
};

export default Dropdown;
