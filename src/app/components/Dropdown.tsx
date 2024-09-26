function Dropdown(props: any) {
	const { dropdownClassName, dropdownHeadClassName, text, onClick } = props;

	return (
		<div className={dropdownClassName} onClick={onClick}>
			<div className={dropdownHeadClassName}>{text}</div>
			{props.children}
		</div>
	);
}

export default Dropdown;
