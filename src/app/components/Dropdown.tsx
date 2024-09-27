function Dropdown(props: any) {
	const { dropdownClass, dropdownHeadClass, text, onClick } = props;

	return (
		<div className={dropdownClass} onClick={onClick}>
			<div className={dropdownHeadClass}>{text}</div>
			{props.children}
		</div>
	);
}

export default Dropdown;
