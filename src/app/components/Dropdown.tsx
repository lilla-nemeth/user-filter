function Dropdown(props: any) {
	const { dropdownClassName, dropdownHeadClassName, text } = props;

	return (
		<div className={dropdownClassName}>
			<div className={dropdownHeadClassName}>{text}</div>
			{props.children}
		</div>
	);
}

export default Dropdown;
