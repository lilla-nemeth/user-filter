function Dropdown(props: any) {
	const { dropdownClass, dropdownHeadClass, text, onClick, style } = props;

	return (
		<div className={dropdownClass} onClick={onClick}>
			<div className={dropdownHeadClass} style={style}>
				{text}
			</div>
			{props.children}
		</div>
	);
}

export default Dropdown;
